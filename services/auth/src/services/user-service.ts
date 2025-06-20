import { UserCrudRepo } from "../repo";
import { accessTokenFunc, refreshTokenFunv } from "../utils/jwt";
import { CustomRequest } from "../utils/customReq";
import { sendData } from "../utils/rabbitmq";
import generateVerificationCode from "../utils/verification-code";
import AppError from "../utils/errors/app-error";
import prisma from "../prisma";
const userRepo = new UserCrudRepo();

import bcrypt from "bcryptjs";
import { v4 as uuidv4 } from 'uuid';
import { Response } from "express";

async function createUser(data: any) {
    try {
        // Check if user already exists
        const existingUser = await userRepo.getByEmail(data.email);

        if (existingUser) {
            throw new AppError("User with this email already exists", 409);
        }

        // Hash the password before saving
        const hashedPassword = await bcrypt.hash(data.password, 10);

        const users = await userRepo.create({
            ...data,
            password: hashedPassword
        });

        const verificationCode = generateVerificationCode();

        // Add the code to database
        const verificationCodeExpiredTime = new Date(); // This gets the current date and time
        verificationCodeExpiredTime.setMinutes(verificationCodeExpiredTime.getMinutes() + 5); 
        await userRepo.update(users.id, { verificationCode, verificationCodeExpiredTime });

        sendData({
            subject: 'Verify the account',
            body: `Here's the verification code → ${verificationCode} verify the account. Verify the account within 5 min`,
            to: users.email
        });

        return {
            user: {
                id: users.id,
                email: users.email,
                name: users.name,
            }
        };
    } catch (error) {
        if (error instanceof AppError) {
            throw error;
        }
        throw new AppError("Internal server error", 500);
    }
}

async function verifyAccount(data: { code: number, email: string, res: Response }) {
    try {
        const users = await userRepo.getByEmail(data.email);

        if(!users) {
            throw new AppError('User not found', 400);
        }

        if(users.CodeExpiredTime < new Date()) { // 5:28 then => 5:35 now
            throw new AppError('Verification code has expired', 400);
        }

        if(data.code !== users.verificationCode) {
            throw new AppError('Invalid verification code', 400);
        }

        const changeIsVerifyed = await userRepo.update(data.email, {verificationCode: undefined, isVerifyed: true});

        // Create a token
        const refreshToken = refreshTokenFunv(users.id, data.res);
        const accessToken = accessTokenFunc(users.id) as string;

        if (!refreshToken || !accessToken) {
            throw new AppError("Failed to create token", 500);
        }

        return {
            accessToken,
            changeIsVerifyed
        };
    } catch (error) {
        if (error instanceof AppError) {
            throw error;
        }
        throw new AppError("Internal server error", 500);
    }
}

async function loginUser(data: { email: string, password: string, res: Response }) {
    try {
        // Check user exist or not
        const users = await userRepo.getByEmail(data.email);

        if(!users) {
            throw new AppError('Invalid email', 400);
        }

        // Check if user verifyed or not
        if(users.isVerifyed === false) {
            throw new AppError('Not verify', 403);
        }

        // Check the password
        const isPasswordValid = await bcrypt.compare(data.password, users.password);

        if(!isPasswordValid) {
            throw new AppError('Invalid password', 400);
        }

        // Create a session
        const refreshToken = refreshTokenFunv(users.id, data.res);
        const accessToken = accessTokenFunc(users.id);

        if (!refreshToken || !accessToken) {
            throw new AppError("Failed to create token", 500);
        }

        return {
            userId: users.id,
            email: users.email,
            accessToken
        }
    } catch (error) {
        if (error instanceof AppError) {
            throw error;
        }
        throw new AppError("Internal server error", 500);
    }
}

async function logoutUser(data: {email: string, password: string, res: Response }) {
    try {
        // check if user exist or not
        const users = await userRepo.getByEmail(data.email);

        if(!users) {
            throw new AppError('Invalid email', 400);
        }

        // Check the password
        const isPasswordValid = await bcrypt.compare(data.password, users.password);

        if(!isPasswordValid) {
            throw new AppError('Invalid password', 400);
        }

        // Clear the cookie
        data.res.cookie("token", '');
    } catch (error) {
        if (error instanceof AppError) {
            throw error;
        }
        throw new AppError("Internal server error", 500);
    }
}

async function getMe(data: { req: CustomRequest }) {
    try {
        const userId = data?.req?.userId

        if(!userId) {
            throw new AppError("Token is valid but missing user ID. Please log in again.", 403);
        }

        const users = await userRepo.getById(userId);

        if(!users) {
            throw new AppError("Invalid user ID. User not found", 400);
        }
        
        return {
            ...users,
            password: (users.password = undefined), // Exclude password from response
        };
    } catch (error) {
        if (error instanceof AppError) {
            throw error;
        }
        throw new AppError("Internal server error", 500);
    }
}

async function forgotPassword(data: { email: string }) {
    try {
        const users = await userRepo.getByEmail(data.email);

        if(!users) {
            throw new AppError('Invalid email', 400);
        }

        // Generate uuid and set expire time
        const forgotPasswordCode = uuidv4();
        const forgotPasswordCodeExpiredTime = new Date(); // This gets the current date and time
        forgotPasswordCodeExpiredTime.setMinutes(forgotPasswordCodeExpiredTime.getMinutes() + 2);

        // update the user info
        try {
            await prisma.user.update(
                {
            where: { email: data.email },
            data: {
                forgotPasswordCode: forgotPasswordCode,
                forgotPasswordCodeExpiredTime: forgotPasswordCodeExpiredTime
            }
        }   
            );
        } catch (error) {
            if (error instanceof AppError) {
                throw error;
            }
            throw new AppError("Internal server error", 500);
        }
        sendData({
            subject: 'Reset the password',
            body: `Here's the link go there and reset your password ${process.env.WEB_URL}/reset-password/${forgotPasswordCode}.
                    It'll expire within 2 min`,
            to: users.email
        });

        return;
    } catch (error) {
        if (error instanceof AppError) {
            throw error;
        }
        throw new AppError("Internal server error", 500);
    }
}

async function verifyForgotPasswordCode(data: { password: string, code: string }) {
    try {
        const users = await prisma.user.findFirst(
            {
                where: { forgotPasswordCode: data.code }
            }
        );

        if(!users) {
            throw new AppError('Invalid url to reset password', 400);
        }

        await userRepo.update(users.id, { password: data.password });

        sendData({
            subject: 'Password successfully updated',
            body: `Your password successfully updated`,
            to: users.email
        });

        return;
    } catch (error) {
        if (error instanceof AppError) {
            throw error;
        }
        throw new AppError("Internal server error", 500);
    }
}

async function changePassword(data: { email: string, currentPassword: string, newPassword: string }) {
    try {
        const users = await userRepo.getByEmail(data.email);

        if(!users) {
            throw new AppError('Invalid email', 400);
        }

        const isPasswordValid = await bcrypt.compare(data.currentPassword, users.password);

        if(!isPasswordValid) {
            throw new AppError('Invalid password', 400);
        }

        await userRepo.update(users.id, { password: data.newPassword });
        sendData({
            subject: 'You\'ve changed your password',
            body: `You\'ve successfully changed your password`,
            to: users.email
        });
        return;
    } catch (error) {
        if (error instanceof AppError) {
            throw error;
        }
        throw new AppError("Internal server error", 500);
    }


}

export default createUser;
export {
    verifyAccount,
    loginUser,
    logoutUser,
    getMe,
    forgotPassword,
    verifyForgotPasswordCode,
    changePassword
}
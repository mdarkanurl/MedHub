import { UserCrudRepo } from "../repo";
import { Response } from "express";
import AppError from "../utils/errors/app-error";
const userRepo = new UserCrudRepo();

import bcrypt from "bcryptjs";
import { accessTokenFunc, refreshTokenFunv } from "../utils/jwt";
import { CustomRequest } from "../utils/customReq";

async function createUser(data: any, res: Response) {
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

        // Create a token
        const refreshToken = refreshTokenFunv(users.id, res);
        const accessToken = accessTokenFunc(users.id) as string;

        if (!refreshToken || !accessToken) {
            throw new AppError("Failed to create token", 500);
        }

        return {
            user: {
                id: users.id,
                email: users.email,
                name: users.name,
            },
            accessToken
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

export default createUser;
export {
    loginUser,
    logoutUser,
    getMe
}
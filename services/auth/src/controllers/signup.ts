import { Request, Response, NextFunction } from "express";
import bcrypt from "bcryptjs";
import { UserCreateSchema } from "../schema";
import prisma from "../prisma";
import { accessToken, refreshToken } from "../utils/jwt";


const signup = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    try {
        const parsedBody = UserCreateSchema.parse(req.body);

        if(!parsedBody) {
            res.status(400).json({
                message: "Invalid request body"
            });
            return;
        }

        // Check if user already exists
        const existingUser = await prisma.user.findUnique({
            where: {
                email: parsedBody.email,
            }
        });

        if (existingUser) {
            res.status(409).json({
                message: "User already exists"
            });
            return;
        }

        // Hash the password before saving
        const hashedPassword = await bcrypt.hash(parsedBody.password, 10);

        const users = await prisma.user.create({
            data: {
                name: parsedBody.name,
                email: parsedBody.email,
                password: hashedPassword,
            }
        });

        // Create a session
        const token = refreshToken(users.id);
        res.cookie("token", token, {
            httpOnly: true,
            sameSite: "strict"
        });

        res.status(201).json({
            message: "User created successfully",
            user: {
                id: users.id,
                email: users.email,
                name: users.name,
            },
            token
        });
        return;
    } catch (error) {
        next(error);
    }
}

export default signup;
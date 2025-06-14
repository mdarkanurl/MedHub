import { UserCrudRepo } from "../repo";
import { Response } from "express";
import AppError from "../utils/errors/app-error";
const userRepo = new UserCrudRepo();

import bcrypt from "bcryptjs";
import { refreshToken } from "../utils/jwt";

async function createUser(data: any, res: Response) {
    // console.log("Creating user with data:", data);
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

        // Create a session
        const token = refreshToken(users.id, res);

        if (!token) {
            throw new AppError("Failed to create session", 500);
        }

        return {
            user: {
                id: users.id,
                email: users.email,
                name: users.name,
            },
            token
        };
    } catch (error) {
        if (error instanceof AppError) {
            throw error;
        }
        throw new AppError("Internal server error", 500);
    }
}

export default createUser;
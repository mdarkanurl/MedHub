import jwt from "jsonwebtoken";
import { Response } from "express";
import { config } from "dotenv";
import AppError from "./errors/app-error";
config();

const JWT_SECRET = process.env.JWT_SECRET || "your_jwt_secret";
const JWT_SECRET_ACCESS = process.env.JWT_SECRET_ACCESS || "your_jwt_secret";

export const accessTokenFunc = (userId: string) => {
    const token = jwt.sign(
        { id: userId },
        JWT_SECRET_ACCESS,
        { expiresIn: "15m" }
    );

    return token;
};


export const refreshTokenFunv = (userId: string, res: Response) => {
    const token = jwt.sign(
        { id: userId },
        JWT_SECRET,
        { expiresIn: "7d" }
    );

    res.cookie("token", token, {
        httpOnly: true,
        sameSite: "strict",
        secure: true
    });

    return token;
};

export const verifyRefreshToken = (token: string) => {
    try {
        return jwt.verify(token, JWT_SECRET) as { id: string };
    } catch (error) {
        if (error instanceof AppError) {
            throw error;
        }
        throw new AppError("Internal server error", 500);
    }
};


export const verifyAccessToken = (token: string) => {
    try {
        return jwt.verify(token, JWT_SECRET_ACCESS) as { id: string };
    } catch (error) {
        if (error instanceof AppError) {
            throw error;
        }
        throw new AppError("Internal server error", 500);
    }
};

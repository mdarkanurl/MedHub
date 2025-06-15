import jwt from "jsonwebtoken";
import { Response } from "express";
import { config } from "dotenv";
config();

const JWT_SECRET = process.env.JWT_SECRET || "your_jwt_secret";

export const accessToken = (userId: string, res: Response) => {
    const token = jwt.sign(
        { id: userId },
        JWT_SECRET,
        { expiresIn: "1h" }
    );

    res.cookie("token", token, {
        httpOnly: true,
        sameSite: "strict"
    });

    return token;
};


export const refreshToken = (userId: string, res: Response) => {
    const token = jwt.sign(
        { id: userId },
        JWT_SECRET,
        { expiresIn: "1y" }
    );

    res.cookie("token", token, {
        httpOnly: true,
        sameSite: "strict"
    });

    return token;
};

export const verifyToken = (token: string) => {
    try {
        return jwt.verify(token, JWT_SECRET);
    } catch (error) {
        return null;
    }
};

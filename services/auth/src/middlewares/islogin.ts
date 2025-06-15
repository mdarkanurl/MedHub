import jwt from "jsonwebtoken";
import { Response, NextFunction } from "express";
import AppError from "../utils/errors/app-error";
import { config } from "dotenv";
import { ErrorResponse } from "../utils/common";
import { CustomRequest } from "../utils/customReq";
config();

const JWT_SECRET = process.env.JWT_SECRET || "your_jwt_secret";


const isLogin = async (
    req: CustomRequest,
    res: Response,
    next: NextFunction
) => {
    try {
        const token =  req?.cookies?.token;

        if(!token) {
            throw new AppError("You're unauthenticated", 403);
        }

        // Verify the token
        let decodedToken;
        try {
            decodedToken = jwt.verify(token, JWT_SECRET) as { id: string };

        } catch (jwtError: any) {

            if (jwtError.name === 'TokenExpiredError') {
                throw new AppError("Your session has expired. Please log in again.", 401);
            }
            
            throw new AppError("Invalid or corrupted token. Please log in again.", 401);
        }

        req.userId = decodedToken.id as string;

        next();
    } catch (error: Error | any) {
        ErrorResponse.error = { errors: error };
        res
            .status(error.statusCode || 500)
            .json(ErrorResponse);
    }
}

export default isLogin;
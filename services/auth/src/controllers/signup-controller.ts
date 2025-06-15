import { Request, Response, NextFunction } from "express";
import { UserCreateSchema } from "../schema";
import UserService from "../services";
import AppError from "../utils/errors/app-error";
import { ErrorResponse, SuccessResponse } from "../utils/common";


const signup = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    try {
        // Validate the request body
        const parseBody = UserCreateSchema.safeParse(req.body);

        if(!parseBody.success) {
            ErrorResponse.message = "Invalid request body";
            ErrorResponse.error = parseBody.error.errors;

            res.status(400).json(ErrorResponse);
            return;
        }


        const users = await UserService.createUser(
            {
                name: parseBody.data.name,
                email: parseBody.data.email,
                password: parseBody.data.password
            }, res
        );

        SuccessResponse.message = "User created successfully";
        SuccessResponse.data = users;
        res.status(201).json(SuccessResponse);
    } catch (error: Error | any) {
        ErrorResponse.error = { errors: error };
        res
            .status(error.statusCode || 500)
            .json(ErrorResponse);
    }
}

export default signup;
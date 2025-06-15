import { Request, Response } from "express";
import { UserLogoutSchema } from "../schema";
import UserService from "../services";
import { ErrorResponse, SuccessResponse } from "../utils/common";


const logout = async (
    req: Request,
    res: Response
) => {
    try {
        // Validate the request body
        const parseBody = UserLogoutSchema.safeParse(req.body);

        if(!parseBody.success) {
            ErrorResponse.message = "Invalid request body";
            ErrorResponse.error = parseBody.error.errors;

            res.status(400).json(ErrorResponse);
            return;
        }


        await UserService.logoutUser(
            {
                email: parseBody.data.email,
                password: parseBody.data.password,
                res
            }
        );

        SuccessResponse.message = "User loggout successfully";
        res.status(201).json(SuccessResponse);
    } catch (error: Error | any) {
        ErrorResponse.error = { errors: error };
        res
            .status(error.statusCode || 500)
            .json(ErrorResponse);
    }
}

export default logout;
import { Request, Response } from "express";
import { verifyAccountSchema } from "../schema";
import UserService from "../services";


const verify = async (
    req: Request,
    res: Response,
) => {
    try {
        // Validate the request body
        const parseBody = verifyAccountSchema.safeParse(req.body);

        if(!parseBody.success) {
            res.status(400).json({
                Success: false,
                Message: 'Invalid request body',
                Data: {},
                Error: parseBody.error.errors
            });
            return;
        }


        const users = await UserService.verifyAccount(
            {
                email: parseBody.data.email,
                code: parseBody.data.code,
                res
            },
        );


        res.status(201).json({
            Success: true,
            Message: 'User verify successfully',
            Data: users,
            Error: {}
        });
    } catch (error: Error | any) {
       res
            .status(error.statusCode || 500)
            .json({
                Success: false,
                Message: error?.message,
                Data: {},
                Error: { ...error }
            });
    }
}

export default verify;
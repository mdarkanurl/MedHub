import { Request, Response } from "express";
import { UserLoginSchema } from "../schema";
import UserService from "../services";


const login = async (
    req: Request,
    res: Response,
) => {
    try {
        // Validate the request body
        const parseBody = UserLoginSchema.safeParse(req.body);

        if(!parseBody.success) {
            res.status(400).json({
                Success: false,
                Message: 'Invalid request body',
                Data: {},
                Error: parseBody.error.errors
            });
            return;
        }


        const users = await UserService.loginUser(
            {
                email: parseBody.data.email,
                password: parseBody.data.password,
                res
            },
        );


        res.status(201).json({
            Success: true,
            Message: 'User loggin successfully',
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

export default login;
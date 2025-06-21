import { Request, Response} from "express";
import { forgotPasswordSchema } from "../schema";
import UserService from "../services";


const forgotPass = async (
    req: Request,
    res: Response
) => {
    try {
        // Validate the request body
        const parseBody = forgotPasswordSchema.safeParse(req.body);

        if(!parseBody.success) {
            res.status(400).json({
                Success: false,
                Message: 'Invalid request body',
                Data: {},
                Error: parseBody.error.errors
            });
            return;
        }


        await UserService.forgotPassword(
            {
                email: parseBody.data.email
            }
        );


        res.status(201).json({
            Success: true,
            Message: 'Check your email to verify',
            Data: {},
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

export default forgotPass;
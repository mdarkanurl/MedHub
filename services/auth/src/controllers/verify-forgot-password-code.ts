import { Request, Response} from "express";
import { verifyForgotPasswordCodeSchema } from "../schema";
import UserService from "../services";


const verifyForgotPasswordCode = async (
    req: Request,
    res: Response
) => {
    try {
        // Validate the request body
        const parseBody = verifyForgotPasswordCodeSchema.safeParse(req.body);
        const forgotPasswordCode: string = req.params.forgotPasswordCode;

        if(!parseBody.success || !forgotPasswordCode) {
            res.status(400).json({
                Success: false,
                Message: 'Invalid request body',
                Data: {},
                Error: parseBody?.error?.errors
            });
            return;
        }


        await UserService.verifyForgotPasswordCode(
            {
                password: parseBody.data.password,
                code: forgotPasswordCode
            }
        );


        res.status(201).json({
            Success: true,
            Message: 'Successfully updated password',
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

export default verifyForgotPasswordCode;
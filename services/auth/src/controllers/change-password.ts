import { Request, Response} from "express";
import { changePasswordSchema } from "../schema";
import UserService from "../services";


const changePassword = async (
    req: Request,
    res: Response
) => {
    try {
        // Validate the request body
        const parseBody = changePasswordSchema.safeParse(req.body);

        if(!parseBody.success) {
            res.status(400).json({
                Success: false,
                Message: 'Invalid request body',
                Data: {},
                Error: parseBody.error.errors
            });
            return;
        }


        await UserService.changePassword(
            {
                email: parseBody.data.email,
                newPassword: parseBody.data.newPassword,
                currentPassword: parseBody.data.currentPassword
            }
        );


        res.status(201).json({
            Success: true,
            Message: 'You\'ve successfully changed the password',
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

export default changePassword;
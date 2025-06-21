import { Request, Response} from "express";
import { deleteAccountSchema } from "../schema";
import UserService from "../services";


const deleteAccount = async (
    req: Request,
    res: Response
) => {
    try {
        // Validate the request body
        const parseBody = deleteAccountSchema.safeParse(req.body);

        if(!parseBody.success) {
            res.status(400).json({
                Success: false,
                Message: 'Invalid request body',
                Data: {},
                Error: parseBody.error.errors
            });
            return;
        }


        await UserService.deleteUser(
            {
                email: parseBody.data.email,
                password: parseBody.data.password
            }
        );


        res.status(201).json({
            Success: true,
            Message: 'You\'ve successfully delete your account',
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

export default deleteAccount;
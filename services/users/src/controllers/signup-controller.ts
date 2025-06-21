import { Request, Response} from "express";
import { UserCreateSchema } from "../schema";
import UserService from "../services";


const signup = async (
    req: Request,
    res: Response
) => {
    try {
        // Validate the request body
        const parseBody = UserCreateSchema.safeParse(req.body);

        if(!parseBody.success) {
            res.status(400).json({
                Success: false,
                Message: 'Invalid request body',
                Data: {},
                Error: parseBody.error.errors
            });
            return;
        }


        const users = await UserService.createUser(
            {
                name: parseBody.data.name,
                email: parseBody.data.email,
                password: parseBody.data.password
            }
        );


        res.status(201).json({
            Success: true,
            Message: 'Verify the account',
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

export default signup;
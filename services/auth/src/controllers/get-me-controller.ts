import { Request, Response } from "express";
import UserService from "../services";
import { CustomRequest } from "../utils/customReq";


const getMe = async (
    req: CustomRequest,
    res: Response
) => {
    try {
        const users = await UserService.getMe({ req });

        res.status(201).json({
            Success: true,
            Message: 'User successfully found',
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

export default getMe;
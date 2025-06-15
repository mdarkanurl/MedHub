import { Request, Response } from "express";
import UserService from "../services";
import { ErrorResponse, SuccessResponse } from "../utils/common";
import { CustomRequest } from "../utils/customReq";


const getMe = async (
    req: CustomRequest,
    res: Response
) => {
    try {
        const users = await UserService.getMe({ req });
        
        SuccessResponse.message = "User successfully found";
        SuccessResponse.data = users;

        res.status(201).json(SuccessResponse);
    } catch (error: Error | any) {
        ErrorResponse.error = { errors: error };
        res
            .status(error.statusCode || 500)
            .json(ErrorResponse);
    }
}

export default getMe;
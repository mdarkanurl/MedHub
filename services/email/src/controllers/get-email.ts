import { Request, Response } from "express";
import { ErrorResponse, SuccessResponse } from "../utils/common";
import { getEmails } from "../services";

const getEmail = async (
    req: Request,
    res: Response
) => {
    try {
        const emails = await getEmails();
        
        SuccessResponse.data = emails;
        SuccessResponse.message = "Emails retrieved successfully";
        
        res.status(200).json(SuccessResponse);
    } catch (error: any) {
        ErrorResponse.error = { errors: error };
        res
            .status(error.statusCode || 500)
            .json(ErrorResponse);
    }
}
    

export default getEmail;
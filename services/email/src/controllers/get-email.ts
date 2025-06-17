import { Request, Response } from "express";
import { getEmails } from "../services";

const getEmail = async (
    req: Request,
    res: Response
) => {
    try {
        const emails = await getEmails();
        
        res.status(200).json({
            Success: true,
            Message: 'Emails retrieved successfully',
            Data: emails,
            Error: {}
        });
    } catch (error: any) {
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
    

export default getEmail;
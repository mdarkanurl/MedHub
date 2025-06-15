import e, { Request, Response, NextFunction } from "express";
import emailSchema from "../schema/sendEmail";
import { ErrorResponse } from "../utils/common";
import { saveEmail } from "../services";

const sendEmail = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    try {
        // Validate the request body
        const parseBody = emailSchema.safeParse(req.body);

        if(!parseBody.success) {
            ErrorResponse.message = "Invalid request body";
            ErrorResponse.error = parseBody.error.errors;

            res.status(400).json(ErrorResponse);
            return;
        }


        const sendEmail = await saveEmail({
            subject: parseBody.data.subject,
            body: parseBody.data.body,
            to: parseBody.data.to
        });

        ErrorResponse.message = "Email sent successfully";
        ErrorResponse.data = sendEmail;

        res.status(201).json(ErrorResponse);
    } catch (error: any) {
        ErrorResponse.error = { errors: error };
        res
            .status(error.statusCode || 500)
            .json(ErrorResponse);
    }
}

export default sendEmail;
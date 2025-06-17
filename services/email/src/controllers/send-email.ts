import e, { Request, Response, NextFunction } from "express";
import emailSchema from "../schema/sendEmail";
import { saveEmail } from "../services";
import AppError from "../utils/errors/app-error";

const sendEmail = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    try {
        // Validate the request body
        const parseBody = emailSchema.safeParse(req.body);

        if(!parseBody.success) {
            res.status(400).json({
                Success: false,
                Message: 'Invalid request body',
                Data: {},
                Error: parseBody.error.errors
            });
            return;
        }


        const sendEmail = await saveEmail({
            subject: parseBody.data.subject,
            body: parseBody.data.body,
            to: parseBody.data.to
        });

        res.status(201).json({
            Success: true,
            Message: 'Email sent successfully',
            Data: sendEmail,
            Error: {}
        });
    } catch (error: AppError | any) {
        res
            .status(error.statusCode || 500)
            .json({
                Success: false,
                Message: error?.message,
                Data: {},
                Error: error
            });
    }
}

export default sendEmail;
import { EmailCrudRepo } from "../repo";
import AppError from "../utils/errors/app-error";
import sendEmail from "../utils/send-email";
const emailRepo = new EmailCrudRepo();

async function saveEmail(data: { subject: string; body: string; to: string }) {
    try {
        // send email using the email repository
        const sendEmails = await sendEmail({
            subject: data.subject,
            body: data.body,
            to: data.to
        });

        // Check if there was an error sending the email
        if (sendEmails.message) {
            throw new AppError(`Failed to send email: ${sendEmails.message}`, 500);
        }

        // create a record of the email in the database
        const savedEmail = await emailRepo.create({
            subject: data.subject,
            from: process.env.EMAIL_FROM || "MedHub <onboarding@resend.dev>",
            body: data.body,
            to: data.to
        });

        if (!savedEmail) {
            throw new AppError("Failed to save email record to database", 500);
        }

        return savedEmail;
    } catch (error) {
        if (error instanceof AppError) {
            throw error;
        }
        throw new AppError("Failed to process email request", 500);
    }
}

async function getEmails() {
    try {
        const emails = await emailRepo.getAll();
        if (!emails || emails.length === 0) {
            throw new AppError("No emails found in the database", 404);
        }

        return emails;
    } catch (error) {
        if (error instanceof AppError) {
            throw error;
        }
        throw new AppError("Failed to process email request", 500);
    }
}

export {
    saveEmail,
    getEmails
}
import { EmailCrudRepo } from "../repo";
import AppError from "../utils/errors/app-error";
import sendEmail from "../utils/send-email";
const emailRepo = new EmailCrudRepo();

async function saveEmail(data: { subject: string; body: string; to: string }) {
    try {
        // send email using the email repository
        await sendEmail({
            subject: data.subject,
            body: data.body,
            to: data.to
        });

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
        throw new AppError("Failed to save email to database", 500);
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
        throw new AppError("Failed to get email from database", 500);
    }
}

export {
    saveEmail,
    getEmails
}
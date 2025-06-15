import { Resend } from "resend";
import AppError from "./errors/app-error";

const resend = new Resend(process.env.RESEND_API_KEY || "your-api-key");

async function sendEmail(userData: { subject: string; body: string; to: string }) {
    const { data, error } = await resend.emails.send({
        from: process.env.EMAIL_FROM || "MedHub <onboarding@resend.dev>",
        to: [userData.to],
        subject: userData.subject,
        html: `<h1>${userData.body}</h1>`,
    });

  if (error) {
    console.error("Error sending email:", error);
    throw new AppError(`Failed to send email: ${error.message}`, 500);
  }

    return data;
};

export default sendEmail;
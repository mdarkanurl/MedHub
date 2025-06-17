import { stat } from "fs";
import { Resend } from "resend";

interface ResendError {
    statusCode: number,
    message: string,
    name: string
}

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
    return {
      message: error.message,
      name: error.name,
    };
  }

    return {
      id: data?.id
    };
};

export default sendEmail;
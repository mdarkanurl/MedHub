import { z } from "zod";

const emailSchema = z.object({
    subject: z.string().min(2),
    body: z.string().min(1),
    to: z.string().email(),
    from: z.string().optional().default("MedHub <onboarding@resend.dev>"),
});

export default emailSchema;

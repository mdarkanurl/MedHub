import { z } from "zod";

export const createDoctorSchema = z.object({
    name: z.string().min(1),
    education: z.string().min(2),
    specialization: z.string().min(2),
    description: z.string().min(2),
    email: z.string().email(),
    password: z.string().min(6)
});
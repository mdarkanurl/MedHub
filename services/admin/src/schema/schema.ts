import { z } from "zod";

export const createDoctorSchema = z.object({
    name: z.string().min(1),
    education: z.string().min(2),
    specialization: z.string().min(2),
    description: z.string().min(2),
    email: z.string().email(),
    password: z.string().min(6)
});

export const createAppointmentSchema = z.object({
    doctorId: z.string(),
    appointmentStartTime: z.string(),
    appointmentEndTime: z.string(),
    totalAppointments: z.number(),
    perAppointmentCost: z.number(),
    perAppointmentDuration: z.number(),
});

export const bookAppointmentSchema = z.object({
    appointmentId: z.string(),
    patientId: z.array(z.string()).min(1)
});
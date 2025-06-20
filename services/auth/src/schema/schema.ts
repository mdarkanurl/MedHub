import { z } from "zod";

export const UserCreateSchema = z.object({
    name: z.string().min(1),
    email: z.string().email(),
    password: z.string().min(6)
});

export const UserLoginSchema = z.object({
    email: z.string().email(),
    password: z.string().min(6)
});

export const UserLogoutSchema = z.object({
    email: z.string().email(),
    password: z.string().min(6)
});


export const verifyAccount = z.object({
    email: z.string().email(),
    code: z.number()
});


export const forgotPassword = z.object({
    email: z.string().email()
});
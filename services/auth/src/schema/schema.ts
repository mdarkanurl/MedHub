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


export const verifyAccountSchema = z.object({
    email: z.string().email(),
    code: z.number()
});


export const forgotPasswordSchema = z.object({
    email: z.string().email()
});

export const verifyForgotPasswordCodeSchema = z.object({
    password: z.string().min(6)
});


export const changePasswordSchema = z.object({
    currentPassword: z.string().min(6),
    newPassword: z.string().min(6),
    email: z.string().email()
});
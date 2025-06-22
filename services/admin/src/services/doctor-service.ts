import { CrudRepo } from "../repo";
import { sendData } from "../utils/rabbitmq";
import AppError from "../utils/errors/app-error";
import prisma from "../prisma";
const doctorRepo = new CrudRepo();

import bcrypt from "bcryptjs";

async function createDoctor(
    data: {
        name: string,
        education: string,
        specialization: string,
        description: string,
        email: string,
        password: string
    }
) {
    try {
        const doctors = await doctorRepo.getByEmail(data.email);

        if(doctors) {
            throw new AppError('With this email doctors exist', 400);
        }

        const hashPassword = await bcrypt.hash(data.password, 10);

        const doctor = await doctorRepo.create({
            ...data,
            password: hashPassword
        });

        return {
            name: doctor.name,
            specialization: doctor.specialization,
            description: doctor.description,
            education: doctor.education
        }
    } catch (error) {
        if(error instanceof AppError) {
            throw error
        }
        throw new AppError("Internal server error", 500);
    }
}

export {
    createDoctor
}
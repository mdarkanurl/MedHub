import { Request, Response } from "express";
import { createDoctorSchema } from "../schema";
import { doctorServices } from "../services";

const createDoctor = async (
    req: Request,
    res: Response
) => {
    try {
        const parseBody = createDoctorSchema.safeParse(req.body);

        if(!parseBody.success) {
            res.status(400).json({
                Success: false,
                Message: 'Invalid request body',
                Data: {},
                Error: parseBody.error.errors
            });
            return;
        }

        const doctors = await doctorServices.createDoctor({
            name: parseBody.data.name,
            education: parseBody.data.education,
            specialization: parseBody.data.specialization,
            description: parseBody.data.description,
            email: parseBody.data.email,
            password: parseBody.data.password
        });

        res.status(201).json({
            Success: true,
            Message: 'Doctor profile successfully created',
            Data: doctors,
            Error: {}
        });
        return;
    } catch (error: any) {
       res
            .status(error.statusCode || 500)
            .json({
                Success: false,
                Message: error?.message,
                Data: {},
                Error: { ...error }
            });
    }
}

export default createDoctor;
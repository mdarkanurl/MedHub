import { appointmentServices } from "../services";
import { Request, Response } from "express";
import { bookAppointmentSchema } from "../schema";

const bookAppointmentController = async (req: Request, res: Response) => {
    try {
        const parseBody = bookAppointmentSchema.safeParse(req.body);

        if(!parseBody.success) {
            res.status(400).json({
                Success: false,
                Message: 'Invalid request body',
                Data: {},
                Error: parseBody.error.errors
            });
            return;
        }

        const appointments = await appointmentServices.bookAppointment({
            appointmentId: parseBody.data.appointmentId,
            patientId: parseBody.data.patientId
        });

        res.status(201).json({
            Success: true,
            Message: 'Appointments successfully booked',
            Data: appointments,
            Error: {}
        });
        return;
    } catch (error: any) {
        res
            .status(error.statusCode || 500)
            .json({
                Success: false,
                Message: error.message,
                Data: {},
                Error: { ...error }
            });
    }
}

export default bookAppointmentController;
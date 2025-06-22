import { appointmentServices } from "../services";
import { Request, Response } from "express";
import { createAppointmentSchema } from "../schema";
import { differenceInMinutes, parseISO } from "date-fns";

const createAppointmentController = async (req: Request, res: Response) => {
    try {
        const parseBody = createAppointmentSchema.safeParse(req.body);

        if(!parseBody.success || parseBody.data.appointmentStartTime > parseBody.data.appointmentEndTime) { // startTime = 10:30 => endTime = 11:00
            res.status(400).json({
                Success: false,
                Message: 'Invalid request body',
                Data: {},
                Error: parseBody?.error?.errors
            });
            return;
        }

        // Get total duration of appointment
        const totalDuration = differenceInMinutes(parseBody.data.appointmentEndTime, parseBody.data.appointmentStartTime);
        const perSessionDuration = totalDuration / parseBody.data.totalAppointments;

        const appointments = await appointmentServices.createAppointment({
            doctorId: parseBody.data.doctorId,
            appointmentStartTime: new Date(parseBody.data.appointmentStartTime),
            appointmentEndTime: new Date(parseBody.data.appointmentEndTime),
            totalAppointments: parseBody.data.totalAppointments,
            perAppointmentCost: parseBody.data.perAppointmentCost,
            perAppointmentDuration: parseBody.data.perAppointmentDuration,
            perSessionDuration: perSessionDuration,
        });

        res.status(201).json({
            Success: true,
            Message: 'Appointments successfully created',
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

export default createAppointmentController;
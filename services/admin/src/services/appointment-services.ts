import AppError from "../utils/errors/app-error";
import { AppointmentCrudRepo } from "../repo";
const appointmentRepo = new AppointmentCrudRepo();

async function createAppointment(data: {
    doctorId: string,
    appointmentStartTime: Date,
    appointmentEndTime: Date,
    totalAppointments: number,
    perAppointmentCost: number,
    perAppointmentDuration: number,
    perSessionDuration: number
}) {
    try {
        const isDoctorAvailable = await appointmentRepo.getById(data.doctorId);

        if(!isDoctorAvailable) {
            throw new AppError('Doctor not found', 404);
        }

        for (let i = 0; i < isDoctorAvailable.length; i++) {
            if(
                isDoctorAvailable[i] &&
                isDoctorAvailable[i].appointmentStartTime === data.appointmentStartTime ||
                isDoctorAvailable[i].appointmentEndTime > data.appointmentStartTime // appointmentEndTime 2:30pm => startTime 2:15pm
            ) {
                throw new AppError('Doctor is not available at this time', 400);
            }
        }

        const appointment = await appointmentRepo.create(data);
        return appointment;
    } catch (error) {
        if (error instanceof AppError) {
            throw error;
        }
        throw new AppError("Internal server error", 500);
    }
}

export {
    createAppointment
}
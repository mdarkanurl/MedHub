import AppError from "../utils/errors/app-error";
import { AppointmentCrudRepo } from "../repo";
import prisma from "../prisma";
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
        const doctors = await prisma.doctor.findUnique({
            where: { id: data.doctorId }
        });

        if(!doctors) {
            throw new AppError('Doctor not found', 404);
        }

        // The doctor is avaliable or not
        const isDoctorAvailable = await prisma.appointment.findMany({
            where: { doctorId: doctors.id }
        });

        for (let i = 0; i < isDoctorAvailable.length; i++) { // appointmentEndTime = 2:20pm => appointmentStartTime = 2:00pm
            if(isDoctorAvailable[i] &&
                isDoctorAvailable[i].appointmentStartTime === data.appointmentStartTime ||
                isDoctorAvailable[i].appointmentEndTime > data.appointmentStartTime
            ) {
                throw new AppError('Doctor not avaliable at this time zone', 400);
            }
        }

        const createAppointments = await appointmentRepo.create(data);
        return createAppointments;
    } catch (error) {
        if (error instanceof AppError) {
            throw error;
        }
        throw new AppError("Internal server error", 500);
    }
}

async function bookAppointment(data: {
    appointmentId: string,
    patientId: string[]
}) {
    try {
        const appointments = await appointmentRepo.getById(data.appointmentId);

        if(!appointments) {
            throw new AppError('Appointment doesn\'t found', 400);
        }

        // Check if session is available or not
        if((appointments.patientId).length === appointments.totalAppointments) { // totalAppointments is 7 => 1
            throw new AppError('The session doesn\'t available. It\'s alreay booked', 400);
        }

        // Book an appointment
        const bookAppointment = await appointmentRepo.update(appointments.id, { patientId: [...appointments.patientId, ...data.patientId] });
        return bookAppointment;
    } catch (error) {
        if (error instanceof AppError) {
            throw error;
        }
        throw new AppError("Internal server error", 500);
    }
}

export {
    createAppointment,
    bookAppointment
}
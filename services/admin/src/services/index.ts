import { createDoctor } from "./doctor-service"
import { createAppointment, bookAppointment } from "./appointment-services"
const doctorServices = {
    createDoctor
}

const appointmentServices = {
    createAppointment,
    bookAppointment
}

export {
    doctorServices,
    appointmentServices
} 
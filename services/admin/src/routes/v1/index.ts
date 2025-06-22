import { Router } from "express";
import createDoctor from "./create-doctor-route";
import createAppointment from "./create-appointment-route";
import bookAppointment from "./book-appointment-route";
const router = Router();

router.use('/doctors', createDoctor);
router.use('/appointments', createAppointment);
router.use('/book-appointments', bookAppointment);

export default router;
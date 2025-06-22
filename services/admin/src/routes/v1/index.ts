import { Router } from "express";
import createDoctor from "./create-doctor-route";
import createAppointment from "./create-appointment-route";
const router = Router();

router.use('/doctors', createDoctor);
router.use('/appointments', createDoctor);

export default router;
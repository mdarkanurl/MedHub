import { Router } from "express";
import { createAppointment } from "../../controllers";
const router = Router();

router.post('/', createAppointment);

export default router;
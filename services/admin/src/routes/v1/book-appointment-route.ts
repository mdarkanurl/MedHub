import { Router } from "express";
import { bookAppointment } from "../../controllers";
const router = Router();

router.post('/', bookAppointment);

export default router;
import { Router } from "express";
import { sendEmail } from "../../controllers";
const router = Router();

router.post("/", sendEmail);

export default router;
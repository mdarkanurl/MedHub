import { Router } from "express";
import sendEmail from "./send-email";
import getEmail from "./get-email";

const router = Router();

router.use("/send-email", sendEmail);
router.use("/get-email", getEmail);

export default router;
import express from "express";
import { verifyForgotPasswordCode } from "../../controllers";
const router = express.Router();

router.post("/", verifyForgotPasswordCode);

export default router;
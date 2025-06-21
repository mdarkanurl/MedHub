import express from "express";
import { verifyForgotPasswordCode } from "../../controllers";
const router = express.Router();

router.put("/:id", verifyForgotPasswordCode);

export default router;
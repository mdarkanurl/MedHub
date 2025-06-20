import express from "express";
import { verify } from "../../controllers";
const router = express.Router();

router.post("/", verify);

export default router;
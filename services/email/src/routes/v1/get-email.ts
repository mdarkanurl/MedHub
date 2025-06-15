import { Router } from "express";
import getEmail from "../../controllers/get-email";
const router = Router();

router.get("/", getEmail);

export default router;
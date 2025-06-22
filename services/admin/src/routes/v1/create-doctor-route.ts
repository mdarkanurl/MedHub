import { Router } from "express";
import { createDoctor } from "../../controllers";
const router = Router();

router.post('/', createDoctor);

export default router;
import { Router } from "express";
import createDoctor from "./create-doctor-route";
const router = Router();

router.use('/doctor', createDoctor);

export default router;
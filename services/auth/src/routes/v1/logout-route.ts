import { Router } from "express";
import { logout } from "../../controllers";
const router = Router();

router.post('/', logout);

export default router;
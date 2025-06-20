import { Router } from "express";
import { forgotPass } from "../../controllers";
const router = Router();

router.post('/', forgotPass);

export default router;
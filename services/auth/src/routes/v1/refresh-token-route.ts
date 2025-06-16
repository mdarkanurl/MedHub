import { Router } from "express";
const router = Router();
import { refresh } from "../../controllers";

router.get('/', refresh);

export default router;
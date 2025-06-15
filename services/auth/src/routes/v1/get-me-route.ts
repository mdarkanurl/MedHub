import { Router } from "express";
import { getMe } from "../../controllers";
import { isLogin } from "../../middlewares";
const router = Router();

router.get('/', isLogin, getMe);

export default router;
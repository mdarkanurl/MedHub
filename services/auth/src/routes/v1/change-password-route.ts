import { Router } from "express";
import { changePassword } from "../../controllers";
import { isLogin } from "../../middlewares";
const router = Router();

router.get('/', isLogin, changePassword);

export default router;
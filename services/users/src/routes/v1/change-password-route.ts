import { Router } from "express";
import { changePassword } from "../../controllers";
import { isLogin } from "../../middlewares";
const router = Router();

router.put('/', isLogin, changePassword);

export default router;
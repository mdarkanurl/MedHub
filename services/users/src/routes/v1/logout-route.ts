import { Router } from "express";
import { logout } from "../../controllers";
import { isLogin } from "../../middlewares";
const router = Router();

router.post('/', isLogin, logout);

export default router;
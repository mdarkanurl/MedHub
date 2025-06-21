import { Router } from "express";
const router = Router();
import { updateProfile } from "../../controllers";
import { isLogin } from "../../middlewares";

router.put('/', isLogin, updateProfile);

export default router;
import { Router } from "express";
import { deleteAccount } from "../../controllers";
import { isLogin } from "../../middlewares";
const router = Router();

router.delete('/', isLogin, deleteAccount);

export default router;
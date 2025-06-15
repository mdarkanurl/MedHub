import { Router } from "express";
import signupRoute from "./signup-route";
import loginRoute from "./login-route";
const router = Router();

router.use('/signup', signupRoute);
router.use('/login', loginRoute);


export default router;
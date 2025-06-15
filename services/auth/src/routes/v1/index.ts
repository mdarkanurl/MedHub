import { Router } from "express";
import signupRoute from "./signup-route";
import loginRoute from "./login-route";
import logoutRoute from "./logout-route";
import getMe from "./get-me-route";
const router = Router();

router.use('/signup', signupRoute);
router.use('/login', loginRoute);
router.use('/logout', logoutRoute);
router.use('/get-me', getMe);


export default router;
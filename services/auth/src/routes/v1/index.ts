import { Router } from "express";
import signupRoute from "./signup-route";
import loginRoute from "./login-route";
import logoutRoute from "./logout-route";
import getMe from "./get-me-route";
import refreshToken from "./refresh-token-route";
import verifyAccount from "./verify-account-route";
import forgotPass from "./forgot-password-route";
import forgotPassCodeVerify from "./forgot-password-route";
import changePassword from "./change-password-route";
import deleteAccount from "./delete-account";
const router = Router();

router.use('/signup', signupRoute);
router.use('/login', loginRoute);
router.use('/logout', logoutRoute);
router.use('/get-me', getMe);
router.use('/refresh-token', refreshToken);
router.use('/verify-account', verifyAccount);
router.use('/forgot-password', forgotPass);
router.use('/reset-password/:id', forgotPassCodeVerify);
router.use('/change-password', changePassword);
router.use('/delete-account', deleteAccount);

export default router;
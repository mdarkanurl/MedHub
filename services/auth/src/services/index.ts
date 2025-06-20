import createUser from './user-service';
import { loginUser, logoutUser, getMe, verifyAccount, forgotPassword, verifyForgotPasswordCode } from './user-service';

const UserService = { createUser, loginUser, logoutUser, getMe, verifyAccount, forgotPassword, verifyForgotPasswordCode };

export default UserService;

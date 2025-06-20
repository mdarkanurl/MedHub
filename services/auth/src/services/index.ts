import createUser from './user-service';
import {
    loginUser,
    logoutUser,
    getMe,
    verifyAccount,
    forgotPassword,
    verifyForgotPasswordCode,
    changePassword
} from './user-service';

const UserService = {
    createUser,
    loginUser,
    logoutUser,
    getMe,
    verifyAccount,
    forgotPassword,
    verifyForgotPasswordCode,
    changePassword
};

export default UserService;

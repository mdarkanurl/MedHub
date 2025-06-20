import {
    createUser,
    loginUser,
    logoutUser,
    getMe,
    verifyAccount,
    forgotPassword,
    verifyForgotPasswordCode,
    changePassword,
    deleteUser
} from './user-service';

const UserService = {
    createUser,
    loginUser,
    logoutUser,
    getMe,
    verifyAccount,
    forgotPassword,
    verifyForgotPasswordCode,
    changePassword,
    deleteUser
};

export default UserService;

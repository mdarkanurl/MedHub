import {
    createUser,
    loginUser,
    logoutUser,
    getMe,
    verifyAccount,
    forgotPassword,
    verifyForgotPasswordCode,
    changePassword,
    deleteUser,
    updateProfile
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
    deleteUser,
    updateProfile
};

export default UserService;

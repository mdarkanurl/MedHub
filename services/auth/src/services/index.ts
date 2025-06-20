import createUser from './user-service';
import { loginUser, logoutUser, getMe, verifyAccount, forgotPassword } from './user-service';

const UserService = { createUser, loginUser, logoutUser, getMe, verifyAccount, forgotPassword };

export default UserService;

import createUser from './user-service';
import { loginUser, logoutUser, getMe, verifyAccount } from './user-service';

const UserService = { createUser, loginUser, logoutUser, getMe, verifyAccount };

export default UserService;

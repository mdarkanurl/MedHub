import createUser from './user-service';
import { loginUser, logoutUser, getMe } from './user-service';

const UserService = { createUser, loginUser, logoutUser, getMe };

export default UserService;

import createUser from './user-service';
import { loginUser, logoutUser } from './user-service';

const UserService = { createUser, loginUser, logoutUser };

export default UserService;

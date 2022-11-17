import createUser from './createUser.service.js';
import deleteUser from './deleteUser.service.js';
import getAllUsers from './getAllUsers.service.js';
import updateUser from './updateUser.service.js';

const userService = {
    getAllUsers,
    createUser,
    updateUser,
    deleteUser,
};

export default userService;

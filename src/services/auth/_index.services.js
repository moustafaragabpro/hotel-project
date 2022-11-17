import getAllAdmins from './getAllAdmins.service.js';
import login from './login.service.js';
import logout from './logout.service.js';
import refreshToken from './refreshToken.service.js';
import register from './register.service.js';
import getAdminById from './getAdminById.service.js';

const authService = {
    register,
    login,
    logout,
    refreshToken,
    getAllAdmins,
    getAdminById,
};
export default authService;

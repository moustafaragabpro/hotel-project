import { PrismaClient } from '@prisma/client';
import responses from './../../helpers/responses.js';
const getAllAdmins = async (req, res, next) => {
    const prisma = new PrismaClient();

    const admins = await prisma.admin.findMany();
    if (!admins) return responses.notFound(res, 'No Admins found');

    const adminData = [];
    admins.forEach((admin) => {
        const { password, ...data } = admin;

        adminData.push(data);
    });

    return responses.success(res, 'All Admins', adminData);
};
export default getAllAdmins;

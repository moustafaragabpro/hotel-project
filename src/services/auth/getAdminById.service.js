import { PrismaClient } from '@prisma/client';
import responses from './../../helpers/responses.js';

const getAdminById = async (req, res, next) => {
    const prisma = new PrismaClient();
    const { id } = req.params;

    const admin = await prisma.admin.findUnique({ where: { id: +id } });
    if (!admin) return responses.notFound(res, 'Admin not found!');

    const { password, ...adminData } = admin;

    return responses.success(res, 'Gettin Admin data successfully ', adminData);
};

export default getAdminById;

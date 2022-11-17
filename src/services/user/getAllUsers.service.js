import { PrismaClient } from '@prisma/client';
import responses from '../../helpers/responses.js';

const getAllUsers = async (req, res, next) => {
    try {
        const prisma = new PrismaClient();

        const users = await prisma.user.findMany();
        const usersData = users.map((user) => {
            const { password, ...data } = user;
            return data;
        });

        return responses.success(res, 'success', usersData);
    } catch (err) {
        next(err);
    }
};
export default getAllUsers;

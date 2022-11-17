import { PrismaClient } from '@prisma/client';
import responses from '../../helpers/responses.js';

const deleteUser = async (req, res, next) => {
    try {
        const { id } = req.params;
        const prisma = new PrismaClient();

        const user = await prisma.user.findUnique({ where: { id: +id } });
        if (!user) return responses.notFound(res, 'No user with given id');

        const { password, ...deletedUser } = await prisma.user.delete({
            where: { id: +id },
        });

        responses.success(res, 'User deleted successfully', deletedUser);
    } catch (err) {
        next(err);
    }
};
export default deleteUser;

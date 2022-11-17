import { PrismaClient } from '@prisma/client';
import responses from '../../helpers/responses.js';

const getRoomById = async (req, res, next) => {
    try {
        const { id } = req.params;

        const prisma = new PrismaClient();
        const room = await prisma.room.findUnique({ where: { id: +id } });

        if (!room) responses.notFound(res, 'No room with given ID');
        responses.success(res, 'Success', room);
    } catch (err) {
        next(err);
    }
};
export default getRoomById;

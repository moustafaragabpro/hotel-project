import { PrismaClient } from '@prisma/client';
import responses from '../../helpers/responses.js';

const deleteRoom = async (req, res, next) => {
    try {
        const { id } = req.params;
        const prisma = new PrismaClient();

        const room = await prisma.room.findUnique({ where: { id: +id } });
        if (!room) responses.notFound(res, 'No room with given ID');

        await prisma.room.delete({ where: { id: +id } });

        responses.success(res, 'Room deleted successfully');
    } catch (err) {
        next(err);
    }
};
export default deleteRoom;

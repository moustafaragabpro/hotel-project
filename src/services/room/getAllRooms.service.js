import { PrismaClient } from '@prisma/client';
import responses from '../../helpers/responses.js';

const getAllRooms = async (req, res, next) => {
    try {
        const prisma = new PrismaClient();

        const rooms = await prisma.room.findMany({});

        responses.success(res, 'Success', rooms);
    } catch (err) {
        next(err);
    }
};
export default getAllRooms;

import { PrismaClient } from '@prisma/client';

import responses from './../../helpers/responses.js';

const reservedRooms = async (req, res, next) => {
    try {
        const prisma = new PrismaClient();
        const { status } = req.query;
        console.log(status);
        // if (
        //     status != 'Reserved' ||
        //     status != 'Available' ||
        //     status != 'Disabled'
        // ) {
        //     return responses.badRequest(res, 'Invalid Status');
        // }
        const filteredRooms = await prisma.room.findMany({ where: { status } });

        return responses.success(res, 'filter success ', filteredRooms);
    } catch (error) {
        if (error) return responses.badRequest(res, 'invalid status');
        next(error);
    }
};

export default reservedRooms;

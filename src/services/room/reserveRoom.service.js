import { PrismaClient } from '@prisma/client';

import reserveRoomSchema from '../../schemas/room/reserveRoom.schema.js';
import responses from './../../helpers/responses.js';

const reserveRoom = async (req, res, next) => {
    try {
        const prisma = new PrismaClient();

        const { error, value } = reserveRoomSchema.validate(req.body, {
            abortEarly: true,
            allowUnknown: false,
        });
        if (error) return responses.badRequest(res, error.details[0].message);

        const { roomId, userId } = value;

        const user = await prisma.user.findUnique({ where: { id: userId } });
        if (!user) return responses.notFound(res, 'User not found');

        const room = await prisma.room.findUnique({ where: { id: roomId } });
        if (!room) return responses.notFound(res, 'Room not found!!');

        const reservedDates = await prisma.reservedRoom.findMany({
            where: { roomId },
        });
        console.log('Reserved Date', reservedDates);
        reservedDates.forEach((item) => {
            if (item.startAt >= value.startAt && item.endAt <= value.endAt)
                return responses.badRequest(
                    res,
                    'Room Already reserved at this date'
                );
        });

        const reservedRoom = await prisma.reservedRoom.create({
            data: value,
        });

        return responses.created(
            res,
            'Reserved Room successfully',
            reservedRoom
        );
    } catch (error) {
        console.log(error);
        next(error);
    }
};

export default reserveRoom;

import { PrismaClient } from '@prisma/client';
import responses from '../../helpers/responses.js';
import createRoomSchema from '../../schemas/room/createRoom.schema.js';

const createRoom = async (req, res, next) => {
    try {
        const prisma = new PrismaClient();
        const { error, value } = createRoomSchema.validate(req.body, {
            abortEarly: true,
            allowUnknown: false,
        });
        if (error) responses.badRequest(res, error.details[0].message);

        const room = await prisma.room.create({
            data: value,
        });

        responses.created(res, 'Room created successfully', room);
    } catch (err) {
        next(err);
    }
};
export default createRoom;

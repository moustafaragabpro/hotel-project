import { PrismaClient } from '@prisma/client';
import responses from '../../helpers/responses.js';
import updateRoomSchema from '../../schemas/room/updateRoom.schema.js';

const updateRoom = async (req, res, next) => {
    try {
        const { id } = req.params;

        const prisma = new PrismaClient();

        const room = await prisma.room.findUnique({ where: { id: +id } });
        if (!room) return responses.notFound(res, 'No Room with given id');

        const { error, value } = updateRoomSchema.validate(req.body, {
            abortEarly: true,
            allowUnknown: false,
        });
        if (error) return responses.badRequest(res, error.details[0].message);

        const updatedRoom = await prisma.room.update({
            where: { id: +id },
            data: value,
        });

        return responses.success(res, 'Room Updated Successfully', updatedRoom);
    } catch (err) {
        next(err);
    }
};
export default updateRoom;

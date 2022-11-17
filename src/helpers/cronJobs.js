import { PrismaClient } from '@prisma/client';
import cron from 'node-cron';

const prisma = new PrismaClient();
export const checkRoomStatus = cron.schedule('*/5 * * * *', async () => {
    const rooms = await prisma.reservedRoom.findMany();
    if (rooms) {
        rooms.forEach(async (room) => {
            const { startAt, endAt, roomId } = room;
            if (startAt <= Date.now() && Date.now() <= endAt) {
                await prisma.room.update({
                    where: { id: +roomId },
                    data: {
                        status: 'Reserved',
                    },
                });
            }
        });
    }
});

export const removeExpiredTokens = cron.schedule('10 * * * *', async () => {
    const invalidTokens = await prisma.invalidJWT.findMany();
    if (invalidTokens) {
        invalidTokens.forEach(async (token) => {
            if (token.exp * 1000 < Date.now()) {
                await prisma.invalidJWT.delete({ where: { id: +token.id } });
            }
        });
    }
});

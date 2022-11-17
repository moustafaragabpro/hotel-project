import checkOut from './checkOutRoom.service.js';
import createRoom from './createRoom.service.js';
import deleteRoom from './deleteRoom.service.js';
import getAllRooms from './getAllRooms.service.js';
import reservedRooms from './getReservedRooms.service.js';
import getRoomById from './getRoomById.service.js';
import reserveRoom from './reserveRoom.service.js';
import updateRoom from './UpdateRoom.service.js';

const roomService = {
    getAllRooms,
    getRoomById,
    createRoom,
    updateRoom,
    deleteRoom,
    reserveRoom,
    checkOut,
    reservedRooms,
};
export default roomService;

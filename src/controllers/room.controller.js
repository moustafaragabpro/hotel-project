import { Router } from 'express';
import validateToken from '../middlewares/validateToken.js';
import roomService from '../services/room/_index.services.js';

const roomRouter = Router();

roomRouter.get('/', validateToken, roomService.getAllRooms); // * Done
roomRouter.get('/filter', validateToken, roomService.reservedRooms); // * Done
roomRouter.get('/:id', validateToken, roomService.getRoomById); // * Done

roomRouter.post('/', validateToken, roomService.createRoom); // * Done
roomRouter.post('/reserve', validateToken, roomService.reserveRoom); // * Done
roomRouter.post('/checkout/:id', validateToken, roomService.checkOut); // * Done

roomRouter.put('/:id', validateToken, roomService.updateRoom); // * Done
roomRouter.delete('/:id', validateToken, roomService.deleteRoom); // * Done

export default roomRouter;

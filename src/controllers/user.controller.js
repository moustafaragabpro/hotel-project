import { Router } from 'express';
import validateToken from '../middlewares/validateToken.js';
import userService from './../services/user/_index.services.js';

const userRouter = Router();

userRouter.get('/', validateToken, userService.getAllUsers);
userRouter.get('/:id', validateToken, userService.getAllUsers);

userRouter.post('/', validateToken, userService.createUser);

userRouter.delete('/:id', validateToken, userService.deleteUser);

export default userRouter;

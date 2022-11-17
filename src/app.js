import { Router } from 'express';
import roomRouter from './controllers/room.controller.js';
import responses from './helpers/responses.js';
// import upload from './middlewares/uploadImage.js';
import userRouter from './controllers/user.controller.js';
import authRouter from './controllers/auth.controller.js';

const appRouter = Router();

appRouter.use('/auth', authRouter);
appRouter.use('/users', userRouter);
appRouter.use('/rooms', roomRouter);

// appRouter.post('/upload', upload.single('image'), (req, res, next) => {
//     res.json({ message: 'Success' });
// });

appRouter.get('/', (req, res) => {
    return responses.success(res, 'API Home');
});

export default appRouter;

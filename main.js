import express from 'express';
import dotenv from 'dotenv';

import appRouter from './src/app.js';
import errorHandler from './src/middlewares/errorHandler.js';
import {
    checkRoomStatus,
    removeExpiredTokens,
} from './src/helpers/cronJobs.js';

dotenv.config();

const app = express();

// * Middlewares
app.use(express.json());

// * CronJobs
checkRoomStatus.start();
removeExpiredTokens.start();

app.use('/api/v1', appRouter);

app.use(errorHandler);

app.listen(4000, () => console.log('listening on port 4000 ...'));

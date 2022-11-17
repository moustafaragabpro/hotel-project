import Joi from 'joi';

const reserveRoomSchema = Joi.object({
    userId: Joi.number().integer().required(),
    roomId: Joi.number().integer().required(),
    startAt: Joi.date().timestamp().min('now').required(),
    endAt: Joi.date().timestamp().greater(Joi.ref('startAt')).required(),
});
export default reserveRoomSchema;

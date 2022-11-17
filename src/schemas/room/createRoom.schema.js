import Joi from 'joi';

const createRoomSchema = Joi.object({
    name: Joi.string().required(),
    dayCost: Joi.number().precision(2).required(),
    description: Joi.string().min(3).required(),
    type: Joi.string().valid('Double', 'Single').required(),
    status: Joi.string().valid('Available', 'Reserved', 'Disabled').required(),
});
export default createRoomSchema;

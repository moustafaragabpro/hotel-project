import Joi from 'joi';

const updateRoomSchema = Joi.object({
    name: Joi.string(),
    dayCost: Joi.number().precision(2),
    description: Joi.string().min(3),
    type: Joi.string().valid('Double', 'Single'),
    status: Joi.string().valid('Available', 'Reserved', 'Disabled'),
});
export default updateRoomSchema;

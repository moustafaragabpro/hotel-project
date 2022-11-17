import Joi from 'joi';

const adminSchema = Joi.object({
    name: Joi.string().min(3).max(60).required(),
    email: Joi.string().email().required(),
    password: Joi.string().required(),
    phoneNumber: Joi.string().required(),
    role: Joi.string().valid('user admin'),
});
export default adminSchema;

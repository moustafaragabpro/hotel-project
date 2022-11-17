import Joi from 'joi';

const userSchema = Joi.object({
    name: Joi.string().min(3).max(60).required(),
    email: Joi.string().email().required(),
    phoneNumber: Joi.string().required(),
    role: Joi.string().valid('user admin'),
});
export default userSchema;

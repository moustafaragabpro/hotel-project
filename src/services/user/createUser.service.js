import { PrismaClient } from '@prisma/client';

import responses from '../../helpers/responses.js';
import userSchema from '../../schemas/user/createUser.schema.js';

const createUser = async (req, res, next) => {
    try {
        const prisma = new PrismaClient();

        const { email } = req.body;
        const emailExist = await prisma.user.findFirst({ where: { email } });
        if (emailExist)
            return responses.badRequest(res, 'Email already exists!');

        const { error, value } = userSchema.validate(req.body, {
            abortEarly: true,
            allowUnknown: false,
        });
        if (error) return responses.badRequest(res, error.details[0].message);

        const createdUser = await prisma.user.create({
            data: value,
        });

        return responses.created(res, 'User created successfully', createdUser);
    } catch (err) {
        next(err);
    }
};
export default createUser;

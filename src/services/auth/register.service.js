import bcrypt from 'bcrypt';
import { PrismaClient } from '@prisma/client';

import responses from '../../helpers/responses.js';
import generateAccessAndRefreshToken from '../../helpers/generateToken.js';
import adminSchema from '../../schemas/user/createAdmin.schema.js';

const register = async (req, res, next) => {
    try {
        const prisma = new PrismaClient();

        const { email } = req.body;
        const emailExist = await prisma.admin.findFirst({ where: { email } });
        if (emailExist)
            return responses.badRequest(res, 'Email already exists!');

        const { error, value } = adminSchema.validate(req.body, {
            abortEarly: true,
            allowUnknown: false,
        });
        if (error) return responses.badRequest(res, error.details[0].message);

        const { password, ...userData } = value;
        const hashedPassword = await bcrypt.hash(password, 10);

        const createdUser = await prisma.admin.create({
            data: {
                ...userData,
                password: hashedPassword,
            },
        });

        const { accessToken, refreshToken } = generateAccessAndRefreshToken(
            createdUser.id
        );

        return responses.created(res, 'Admin created successfully', {
            ...userData,
            accessToken,
            refreshToken,
        });
    } catch (err) {
        next(err);
    }
};
export default register;

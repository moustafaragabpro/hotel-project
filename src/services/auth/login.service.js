import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcrypt';

import responses from '../../helpers/responses.js';
import loginSchema from '../../schemas/auth/login.schema.js';
import generateAccessAndRefreshToken from './../../helpers/generateToken.js';

const login = async (req, res, next) => {
    try {
        const prisma = new PrismaClient();

        const { error, value } = loginSchema.validate(req.body, {
            abortEarly: true,
            allowUnknown: false,
        });
        if (error) return responses.badRequest(res, error.details[0].message);

        const { email, password } = value;

        const isExist = await prisma.admin.findFirst({ where: { email } });
        if (!isExist) return responses.notFound(res, 'Wrong Email');

        const match = bcrypt.compareSync(password, isExist.password);
        if (!match) return responses.badRequest(res, 'Wrong password');

        const { accessToken, refreshToken } = generateAccessAndRefreshToken(
            isExist.id
        );

        return responses.success(res, 'Login Success', {
            accessToken,
            refreshToken,
        });
    } catch (error) {
        next(error);
    }
};

export default login;

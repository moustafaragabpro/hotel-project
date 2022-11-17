import { PrismaClient } from '@prisma/client';
import jwt from 'jsonwebtoken';

import responses from './../../helpers/responses.js';

const logout = async (req, res, next) => {
    try {
        const prisma = new PrismaClient();

        const { authorization } = req.headers;
        const token = authorization.split(' ')[1];

        const { exp } = jwt.decode(token);

        const blockedJwt = await prisma.invalidJWT.create({
            data: {
                jwt: token,
                exp,
            },
        });

        return responses.success(res, 'Logged out successfully', blockedJwt);
    } catch (error) {
        next(error);
    }
};
export default logout;

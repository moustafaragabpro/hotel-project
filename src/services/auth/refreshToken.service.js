import { PrismaClient } from '@prisma/client';
import responses from '../../helpers/responses.js';
import jwt from 'jsonwebtoken';
import generateAccessAndRefreshToken from '../../helpers/generateToken.js';

const refreshToken = async (req, res, next) => {
    try {
        const prisma = new PrismaClient();

        const { authorization } = req.headers;
        if (!authorization) return responses.unAuthorized(res);

        const rfrshToken = authorization.split(' ')[1];

        const isInvalid = await prisma.invalidJWT.findFirst({
            where: { jwt: rfrshToken },
        });
        if (isInvalid) return responses.unAuthorized(res, 'Invalid token!!');

        const payload = jwt.verify(rfrshToken, process.env.JWT_REFRESH_TOKEN);
        if (!payload) return responses.unAuthorized(res, 'Invalid token');

        const { exp, id } = payload;
        if (exp * 1000 < Date.now())
            return responses.badRequest(res, 'Expired Token');

        const { accessToken, refreshToken } = generateAccessAndRefreshToken(id);

        await prisma.invalidJWT.create({
            data: {
                jwt: rfrshToken,
                exp,
            },
        });

        return responses.success(res, 'Tokens renewed successfully', {
            accessToken,
            refreshToken,
        });
    } catch (error) {
        next(error);
    }
};

export default refreshToken;

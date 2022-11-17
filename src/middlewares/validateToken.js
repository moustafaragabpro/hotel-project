import { PrismaClient } from '@prisma/client';
import jwt from 'jsonwebtoken';
import responses from '../helpers/responses.js';

const validateToken = async (req, res, next) => {
    try {
        const prisma = new PrismaClient();

        const { authorization } = req.headers;
        if (!authorization) return responses.unAuthorized(res);

        const token = authorization.split(' ')[1];

        const notValidToken = await prisma.invalidJWT.findFirst({
            where: { jwt: token },
        });
        if (notValidToken) return responses.unAuthorized(res, 'Invalid Token!');

        const verified = jwt.verify(token, process.env.JWT_ACCESS_TOKEN);
        if (!verified) return responses.unAuthorized(res, 'Invalid token!');
        const { id } = verified;

        req.userId = id;

        next();
    } catch (err) {
        console.log(err);
        return responses.unAuthorized(res, 'Invalid');
    }
};

export default validateToken;

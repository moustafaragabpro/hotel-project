import jwt from 'jsonwebtoken';

const generateAccessAndRefreshToken = (id) => {
    const accessToken = jwt.sign({ id }, process.env.JWT_ACCESS_TOKEN, {
        expiresIn: '1h',
    });
    const refreshToken = jwt.sign({ id }, process.env.JWT_REFRESH_TOKEN, {
        expiresIn: '7d',
    });

    return { accessToken, refreshToken };
};
export default generateAccessAndRefreshToken;

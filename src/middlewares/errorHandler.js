import responses from '../helpers/responses.js';

const errorHandler = (err, req, res, next) => {
    console.log(err);
    return responses.internalServerError(res);
};

export default errorHandler;

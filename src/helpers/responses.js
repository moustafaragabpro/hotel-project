const success = (res, massage, data = {}) =>
    res.status(200).json({ massage, data });
const created = (res, massage, data = {}) =>
    res.status(201).json({ massage, data });

const badRequest = (res, massage) => res.status(400).json({ massage });
const unAuthorized = (res, massage = 'UnAuthorized') =>
    res.status(401).json({ massage });
const forbidden = (res, massage = 'Forbidden') =>
    res.status(403).json({ massage });
const notFound = (res, massage) => res.status(404).json({ massage });

const internalServerError = (res, massage = 'Kindly call the backend!') =>
    res.status(500).json({ massage });

const responses = {
    success,
    created,
    badRequest,
    unAuthorized,
    forbidden,
    notFound,
    internalServerError,
};

export default responses;

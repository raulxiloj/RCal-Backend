const { response } = require("express");
const jwt = require('jsonwebtoken');

const checkJWT = (req, res = response, next) => {

    const token = req.headers.token;

    if (!token) {
        return res.status(401).json({
            ok: false,
            msg: 'Unauthorized'
        });
    }

    try {

        const payload = jwt.verify(token, process.env.SECRET_JWT_KEY);
        req.uid = payload.id;
        req.name = payload.name;

    } catch (e) {
        return res.status(401).json({
            ok: false,
            msg: 'Invalid token'
        })
    }

    next();

}

module.exports = checkJWT;
const jwt = require('jsonwebtoken');

const generateJWT = (id, name) => {

    const paylaod = { id, name };
    token = jwt.sign(paylaod, process.env.SECRET_JWT_KEY, {
        expiresIn: '2h'
    })

    return token;

}

module.exports = {
    generateJWT
}
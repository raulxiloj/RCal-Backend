const { Router } = require('express');
const { check } = require('express-validator');
const router = Router();

const { createUser, login, renewToken } = require('../controllers/auth');
const fieldValidator = require('../middlewares/field-validator');
const checkJWT = require('../middlewares/check-jwt');

router.post('/new',
    [
        check('name', 'The name is required').notEmpty(),
        check('email', 'Invalid email').isEmail(),
        check('password', 'The password should be at least of 6 characters').isLength({ min: 6 }),
        fieldValidator
    ],
    createUser);

router.post('/',
    [
        check('email', 'Invalid email').isEmail(),
        check('password', 'The password should be at least of 6 characters').isLength({ min: 6 }),
        fieldValidator
    ]
    , login);

router.get('/renew', checkJWT, renewToken);

module.exports = router;
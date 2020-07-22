const { response } = require('express'); //Just to have the intellisense
const bcrypt = require('bcryptjs');
const User = require('../models/User');
const { generateJWT } = require('../helpers/jwt');


const createUser = async (req, res = response) => {

    const { email, password } = req.body;

    try {

        let user = await User.findOne({ email });

        if (user) {
            return res.status(400).json({
                ok: false,
                msg: 'A user is registered with that email'
            })
        }

        user = new User(req.body);

        //Encrypt password
        const salt = bcrypt.genSaltSync();
        user.password = bcrypt.hashSync(password, salt);

        await user.save();

        //Generate token
        const token = generateJWT(user.id, user.name);

        res.status(201).json({
            ok: true,
            uid: user.id,
            name: user.name,
            token
        });

    } catch (e) {
        console.log(e);
        res.status(500).json({
            ok: false,
            msg: 'Please contact the admin'
        })
    }

}

const login = async (req, res = response) => {

    const { email, password } = req.body;

    try {

        const user = await User.findOne({ email });

        if (!user) {
            return res.status(400).json({
                ok: false,
                msg: 'A user with that email is not register'
            })
        }

        //Match passwords
        const validPass = bcrypt.compareSync(password, user.password);

        if (!validPass) {
            return res.status(400).json({
                ok: false,
                msg: 'Incorrect password'
            });
        }

        //Generate token
        const token = generateJWT(user.id, user.name);

        res.status(200).json({
            ok: true,
            uid: user.id,
            name: user.name,
            token
        });

    } catch (e) {
        console.log(e);
        res.status(500).json({
            ok: false,
            msg: 'Please contact the admin'
        });
    }

}

const renewToken = (req, res = response) => {

    const { uid, name } = req;

    //generate a new token
    const token = generateJWT(uid, name);

    res.json({
        ok: true,
        token
    })

}

module.exports = {
    createUser,
    login,
    renewToken
}
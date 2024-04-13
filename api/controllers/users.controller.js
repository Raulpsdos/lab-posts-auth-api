const mongoose = require('mongoose');
const User = require('../models/user.model');
const { v4: uuidv4 } = require('uuid');

module.exports.create = (req, res, next) => {
    User.create(req.body)
        .then((user) => {
            res.json(user);
        })
        .catch((error) => {
            if (error instanceof mongoose.Error.ValidationError) {
                res.status(400).json(error.errors);
            } else {
                next(error);
            }
        });
}

// Instalar UUID para generar la cookie de la sesión

// Cookie de sesión inicializada
const sessions = [];

module.exports.login = (req, res, next) => {
    User.findOne({ email: req.body.email })
        .then((user) => { 
            if (user) {
                user.checkPassword(req.body.password)
                .then((match) => {
                    if (match) {
                        const sessionId = uuidv4();

                        sessions.push({ userId: user.id, sessionId });

                        res.set('Set-Cookie', `sessionId=${sessionId}`);

                        res.send();

                    } else {
                        res.status(401).json({ message: 'Invalid password'});
                    }
                })
                .catch(next);
            } else {
                res.status(401).json({ message: 'User not found'});
            }
        })
        .catch(next);
}
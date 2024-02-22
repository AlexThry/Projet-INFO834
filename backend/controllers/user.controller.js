const User = require('../models/user.model');
const validator = require('validator');
const bcrypt = require('bcrypt');

exports.getUsers = (req, res) => {
    User.find()
        .then(users => res.status(201).json(users))
        .catch(error => res.status(401).json({ error }))
}


exports.checkUserCredential = (req, res) => {
    User.findOne({email: req.body.email})
        .then(user => {
            if (user) {
                bcrypt.compare(req.body.password, user.password)
                    .then(valid => {
                        if (valid) {
                            res.status(201).json(true);
                        } else {
                            res.status(201).json(false);
                        }
                    })
            } else {
                res.status(201).json(false);
            }
        })
        .catch(error => res.status(401).json({error}));
}

exports.addUser = (req, res) => {
    bcrypt.hash(req.body.password, 10)
        .then(hash => {
            if (!validator.isEmail(req.body.email)) {
                res.status(401).json({message: "provided_email_is_not_valid"})
            } else {
                const user = new User({
                    username: req.body.username,
                    email: req.body.email,
                    password: hash,
                    profile_picture: req.body.profile_picture
                });

                user.save()
                    .then(() => res.status(201).json({ message: 'user_added'}))
                    .catch(error => res.status(401).json({ error }));
            }
        })
}




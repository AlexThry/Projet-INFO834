const User = require('../models/user.model');
const validator = require('validator');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const mongoose = require('mongoose');

exports.getUsers = (req, res) => {
    User.find()
        .then(users => res.status(201).json(users))
        .catch(error => res.status(401).json({error}))
}

exports.getUserById = (req, res) => {
    const user_id = new mongoose.Types.ObjectId(req.params.user_id);
    User.findOne({_id: user_id})
        .then(user => res.status(201).json(user))
        .catch(error => res.status(401).json({error}));
}

exports.login = (req, res, next) => {

    User.findOne({email: req.body.email})
        .then(user => {
            if(!user) {
                return res.status(401).json({type: "email", message: "Error during connection"});
            }


            bcrypt.compare(req.body.password, user.password)
                .then(valid => {
                    if (!valid) {
                        return res.status(401).json({type: "password", message: "Error during connection"});
                    }

                    res.status(200).json( user );
                })
                .catch(error => res.status(500).json({ prout: "prout" }));
        })
        .catch(error => res.status(500).json({ err: "lala" }));

};

// exports.login = (req, res) => {
//     User.findOne({email: req.body.email})
//         .then(user => {
//             if (user) {
//                 bcrypt.compare(req.body.password, user.password)
//                     .then(valid => {
//                         if (valid) {
//                             User.updateOne({email: req.body.email}, {$inc: {nb_connection: 1}})
//                                 .then(() => {
//                                     res.status(201).json({
//                                         user: user,
//                                         token: jwt.sign(
//                                             { userId: user._id},
//                                             'RANDOM_TOCKEN_SECRET',
//                                             { expiresIn: "24h" }
//                                         )
//                                     });
//                                 })
//                                 .catch(error => res.status(401).json({error}))
//                         } else {
//                             res.status(201).json(false);
//                         }
//                     })
//                     .catch(error => req.status(401).json({error}));
//             } else {
//                 res.status(201).json(false);
//             }
//         })
//         .catch(error => res.status(401).json({error}));
// }

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
                    profile_picture: req.body.profile_picture,
                    nb_connection: 0
                });

                user.save()
                    .then(() => res.status(201).json({message: 'user_added'}))
                    .catch(error => res.status(401).json({error}));
            }
        })
}




const User = require('../models/user.model');
const validator = require('validator');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const mongoose = require('mongoose');
const {initializeRedisClient, addUserToConnectedUsers, getConnectedUsers, removeUserFromConnectedUsers} = require("../middleware/redis");

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

exports.logout = (req, res) => {
    initializeRedisClient().then(() => {
        removeUserFromConnectedUsers(req.params.user_id);
        console.log("user_disconnected")
    })
        .then(() => res.status(200).json({message: "user_disconnected"}))
        .catch(error => res.status(401).json({error}));
}

exports.getConnectedUsers = (req, res) => {
    initializeRedisClient().then(() => {
        console.log("connected_users")
        getConnectedUsers()
            .then(users => res.status(200).json(users))
            .catch(error => res.status(401).json({error}));
    })
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
                    initializeRedisClient().then(() => {
                        addUserToConnectedUsers(user._id);
                    })
                })
                .catch(error => res.status(500).json({ prout: "prout" }));
        })
        .catch(error => res.status(500).json({ err: "lala" }));

};

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




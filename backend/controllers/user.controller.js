const User = require('../models/user.model');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

exports.getUsers = (req, res) => {
    User.find()
        .then(users => res.status(200).json(users))
        .catch(error => res.status(400).json({ error }))
}

exports.addUser = (req, res) => {
    const user = new User({
        username: req.body.username,
        email: req.body.email,
        password: req.body.password,
        profile_picture: req.body.profile_picture
    });

    user.save()
        .then(() => res.status(201).json({ message: 'user_registered'}))
        .catch(error => res.status(400).json({ error }));
}


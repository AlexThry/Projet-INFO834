const Message = require('../models/message.model');
const mongoose = require("mongoose");

exports.getMessages = (req, res) => {
    Message.find()
        .then(messages => res.status(201).json(messages))
        .catch(error => res.status(401).json({error}));
}

exports.getMessagesSortedOffsetValues = (req, res) => {
    Message.find()
        .sort({timestamp: -1})
        .skip(req.params.offset)
        .limit(req.params.values)
        .then(messages => res.status(201).json(messages))
        .catch(error => res.status(401).json({error}));
}

// récupérer les messages dans la conversation entre user1 et user2

exports.getMessagesSortedByUserIdsOffsetValues = (req, res, next) => {
    const user1 = new mongoose.Types.ObjectId(req.params.user1);
    const user2 = new mongoose.Types.ObjectId(req.params.user2);
    Message.find({
        $or: [
            {sender_id: user1, receiver_id: user2},
            {sender_id: user2, receiver_id: user1},
        ],
    })
        .sort({timestamp: -1})
        .skip(req.params.offset)
        .limit(req.params.values)
        .then((message) => res.status(200).json(message))
        .catch((error) => res.status(401).json({error}));
};

exports.addMessage = (req, res) => {
    const message = new Message({
        sender_id: req.body.sender_id,
        receiver_id: req.body.receiver_id,
        content: req.body.content,
        timestamp: Date.now()
    });

    message.save()
        .then(() => res.status(201).json({message: "message_added"}))
        .catch(error => res.status(401).json({error}));
}
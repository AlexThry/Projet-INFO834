const Message = require('../models/message.model');

exports.getMessages = (req, res) => {
    Message.find()
        .then(messages => res.status(201).json(messages))
        .catch(error => res.status(400).json({error}));
}

exports.getMessagesSortedOffsetValues = (req, res) => {
    Message.find()
        .sort({timestamp: -1})
        .skip(req.params.offset)
        .limit(req.params.values)
        .then(messages => res.status(200).json(messages))
        .catch(error => res.status(400).json({error}))
}

exports.addMessage = (req, res) => {
    const message = new Message({
        sender_id: req.body.sender_id,
        receiver_id: req.body.receiver_id,
        content: req.body.content,
        timestamp: Date.now()
    });

    message.save()
        .then(() => res.status(200).json({message: "message_added"}))
        .catch(error => res.status(400).json({error}));
}
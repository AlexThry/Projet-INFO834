const Message = require('../models/message.model');
const mongoose = require("mongoose");

exports.getMessages = (req, res) => {
    Message.find()
        .then(messages => res.status(201).json(messages))
        .catch(error => res.status(401).json({error}));
}

exports.addMessage = (req, res) => {
    Message.collection.dropIndex('content_1', function(err, result) {
        if (err) {
            console.log('Error in dropping index!', err);
        }
    });
    console.log("prout")

    const sender_id = new mongoose.Types.ObjectId(req.body.sender_id);
    const receiver_id = new mongoose.Types.ObjectId(req.body.receiver_id);
    const chatroom_id = new mongoose.Types.ObjectId(req.body.chatroom_id);

    const message = new Message({
        sender_id: sender_id,
        receiver_id: receiver_id,
        chatroom_id: chatroom_id,
        content: req.body.content,
        timestamp: Date.now()
    });

    message.save()
        .then(() => res.status(201).json({message: "message_added"}))
        .catch(error => res.status(401).json({error}));
}

exports.getMessagesFromChatroomId = (req, res) => {
    const chatroomId = new mongoose.Types.ObjectId(req.body.chatroom_id);

    Message.find({chatroom_id: chatroomId})
        .sort({timestamp: -1})
        .skip(req.body.offset)
        .limit(req.body.limit)
        .then(messages => res.status(200).json(messages))
        .catch(error => res.status(401).json({error}));
}

exports.deleteAllMessages = (req, res) => {
    Message.deleteMany()
        .then(() => res.status(201).json({message: "all_messages_deleted"}))
        .catch(error => res.status(401).json({error}));
}
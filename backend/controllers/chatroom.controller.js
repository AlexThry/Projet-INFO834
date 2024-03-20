const ChatRoom = require('../models/chatroom.model');
const mongoose = require("mongoose");

exports.getAllChatrooms = (req, res) => {
    ChatRoom.find()
        .then(chatrooms => res.status(200).json(chatrooms))
        .catch(error => res.status(401).json({error}));
}

exports.getChatroom = (req, res) => {
    const user1 = new mongoose.Types.ObjectId(req.body.user1);
    const user2 = new mongoose.Types.ObjectId(req.body.user2);

    ChatRoom.findOne({
        $or: [
            {user1: user1, user2: user2},
            {user1: user2, user2: user1}
        ]
    })
        .then(existingChatroom => {
            if (existingChatroom) {
                ChatRoom.findOneAndUpdate(
                    { _id: existingChatroom._id },
                    { timestamp: new Date() },
                    { new: true }  // retourne le document mis à jour
                )
                    .then(updatedChatroom => res.status(200).json(updatedChatroom))
                    .catch(error => res.status(500).json({error}));
            } else {
                const chatroom = new ChatRoom({
                    user1: user1,
                    user2: user2,
                    timestamp: new Date()
                });

                chatroom.save()
                    .then(() => res.status(200).json(chatroom))
                    .catch(error => res.status(400).json({error}))
            }
        })
        .catch(error => res.status(500).json({error}));
}

exports.getUsersChatroom = (req, res) => {
    const user1 = new mongoose.Types.ObjectId(req.body.user1);
    const user2 = new mongoose.Types.ObjectId(req.body.user2);

    ChatRoom.findOne({
        $or: [
            {user1: user1, user2: user2},
            {user1: user2, user2: user1}
        ]
    })
        .sort({timestamp: -1})
        .then(chatroom => res.status(200).json(chatroom))
        .catch(error => res.status(401).json({error}));
}

exports.deleteAllChatrooms = (req, res) => {
    ChatRoom.deleteMany()
        .then(() => res.status(200).json({message: "all chatrooms deleted"}))
        .catch(error => res.status(401).json({error}));
}

exports.getAllUserChatrooms = (req, res) => {
    const userId = new mongoose.Types.ObjectId(req.body.user_id);
    ChatRoom.find({
        $or: [
            {user1: userId},
            {user2: userId}
        ]
    })
        .then(chatrooms => res.status(200).json(chatrooms))
        .catch(error => res.status(401).json({error}));
}


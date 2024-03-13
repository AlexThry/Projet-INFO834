const ChatRoom = require('../models/chatroom.model');
const mongoose = require("mongoose");

exports.newChatRoom = (req, res) => {
    const user1 = new mongoose.Schema.Types.ObjectId(req.body.user1_id);
    const user2 = new mongoose.Schema.Types.ObjectId(req.body.user2_id);

    const chatRoom = new ChatRoom({
        user1: user1,
        user2: user2
    });

    chatRoom.save()
        .then(() => res.status(200).json({message: "chatroom_added"}))
        .catch(error => res.status(400).json({error}))
}

exports.getChatByUsers = (req, res) => {
    const userId = new mongoose.Schema.Types.ObjectId(req.body.user_id);
    ChatRoom.find({
        $or: [
            {user1: userId},
            {user2: userId}
        ]
    })
        .then(chatrooms => res.status(200).json(chatrooms))
        .catch(error => res.status(401).json({error}));
}


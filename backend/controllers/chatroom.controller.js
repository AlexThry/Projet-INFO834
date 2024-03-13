const ChatRoom = require('../models/chatroom.model');
const mongoose = require("mongoose");

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


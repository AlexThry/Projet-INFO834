const mongoose = require("mongoose");

const chatRoomSchema = mongoose.Schema({
    user1: {type: mongoose.Schema.Types.ObjectId, ref: 'User'},
    user2: {type: mongoose.Schema.Types.ObjectId, ref: 'User'},
});

module.exports = mongoose.model('ChatRoom', chatRoomSchema);
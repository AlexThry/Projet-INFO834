const mongoose = require("mongoose");

const chatRoomSchema = mongoose.Schema({
    user1: {type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true},
    user2: {type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true},
    timestamp: {type: Date, required: true}
});

module.exports = mongoose.model('ChatRoom', chatRoomSchema);
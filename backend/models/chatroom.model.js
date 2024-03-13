const mongoose = require("mongoose");

const chatRoomSchema = mongoose.Schema({
    users: [{type: mongoose.Schema.Types.ObjectId, ref: 'User'}],
    messages: [{type: mongoose.Schema.Types.ObjectId, ref: 'Message'}]
});

module.exports = mongoose.model('ChatRoom', chatRoomSchema);
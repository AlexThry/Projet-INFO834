const mongoose = require("mongoose");

const messageSchema = mongoose.Schema({
    sender_id: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    receiver_id: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    chatroom_id: { type: mongoose.Schema.Types.ObjectId, ref: 'ChatRoom', required: true },
    content: { type: String, required: true },
    timestamp: { type: Date, required: true }
});

module.exports = mongoose.model('Message', messageSchema);
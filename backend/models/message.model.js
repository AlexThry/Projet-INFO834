const mongoose = require("mongoose");

const messageSchema = mongoose.Schema({
    sender_id: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    receiver_id: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    content: { type: String, required: true, unique: true },
    timestamp: { type: Number, required: true }
});

module.exports = mongoose.model('Message', messageSchema);
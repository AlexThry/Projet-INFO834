const express = require('express');
const messageCtrl = require('../controllers/message.controller');

const router = express.Router();

// GET
router.get("/", messageCtrl.getMessages);
router.get("/delete/all", messageCtrl.deleteAllMessages);

// POST
router.post("/add", messageCtrl.addMessage);
router.post("/chatroom", messageCtrl.getMessagesFromChatroomId)

module.exports = router;
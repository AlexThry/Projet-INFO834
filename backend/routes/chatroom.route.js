const express = require('express');
const chatroomCtrl = require('../controllers/chatroom.controller');

const router = express.Router()

// GET


// POST

router.post("/id=:id", chatroomCtrl.getChatByUsers)


module.exports = router;
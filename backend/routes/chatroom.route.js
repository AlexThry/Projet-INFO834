const express = require('express');
const chatroomCtrl = require('../controllers/chatroom.controller');

const router = express.Router()

// GET

router.get("/", chatroomCtrl.getAllChatrooms)


// POST

router.post("/new", chatroomCtrl.newChatroom)
router.post("/userid", chatroomCtrl.getAllUserChatrooms)
router.post("/conv", chatroomCtrl.getUsersChatroom)


module.exports = router;
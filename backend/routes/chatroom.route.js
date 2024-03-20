const express = require('express');
const chatroomCtrl = require('../controllers/chatroom.controller');

const router = express.Router()

// GET

router.get("/", chatroomCtrl.getAllChatrooms)
router.get("/delete/all", chatroomCtrl.deleteAllChatrooms)


// POST

router.post("/new", chatroomCtrl.getChatroom)
router.post("/userid", chatroomCtrl.getAllUserChatrooms)
router.post("/conv", chatroomCtrl.getUsersChatroom)


module.exports = router;
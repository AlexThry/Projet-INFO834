const express = require('express');
const messageCtrl = require('../controllers/message.controller');

const router = express.Router();

// GET
router.get("/", messageCtrl.getMessages);
router.get("/offset=:offset&values=:values", messageCtrl.getMessagesSortedOffsetValues)
router.get("/user1=:user1&user2=:user2/offset=:offset&values=:values", messageCtrl.getMessagesSortedByUserIdsOffsetValues)

// POST
router.post("/add", messageCtrl.addMessage);

module.exports = router;
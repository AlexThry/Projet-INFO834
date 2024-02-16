const express = require('express');
const messageCtrl = require('../controllers/message.controller');

const router = express.Router();

// GET
router.get("/", messageCtrl.getMessages);
router.get("/offset=:offset&values=:values", messageCtrl.getMessagesSortedOffsetValues)

// POST
router.post("/add", messageCtrl.addMessage);

module.exports = router;
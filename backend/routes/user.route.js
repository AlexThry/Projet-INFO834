const express = require('express');
const userCtrl = require('../controllers/user.controller');

const router = express.Router();

// Routes GET
router.get("/", userCtrl.getUsers);

// Routes POST
router.post("/add", userCtrl.addUser);

module.exports = router;
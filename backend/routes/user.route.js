const express = require('express');
const userCtrl = require('../controllers/user.controller');

const router = express.Router();

// Routes GET
router.get("/", userCtrl.getUsers);
router.get("/id=:user_id", userCtrl.getUserById);
router.get("/logout/id=:user_id", userCtrl.logout);
router.get("/connected_users", userCtrl.getConnectedUsers);

// Routes POST
router.post("/add", userCtrl.addUser);
router.post("/login", userCtrl.login);

module.exports = router;
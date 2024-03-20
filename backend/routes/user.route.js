const express = require('express');
const userCtrl = require('../controllers/user.controller');

const router = express.Router();

// Routes GET
router.get("/", userCtrl.getUsers);
router.get("/id=:user_id", userCtrl.getUserById);
router.get("/logout/id=:user_id", userCtrl.logout);
router.get("/connected_users", userCtrl.getConnectedUsers);
router.get("/updateUsername/id=:user_id", userCtrl.updateUsername);
router.get("/updateEmail/id=:user_id", userCtrl.updateEmail);
router.get("/updatePassword/id=:user_id", userCtrl.updatePassword);

// Routes POST
router.post("/add", userCtrl.addUser);
router.post("/login", userCtrl.login);

module.exports = router;
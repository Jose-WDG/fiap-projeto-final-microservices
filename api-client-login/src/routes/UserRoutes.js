const express = require('express');
const router = express.Router();

const userController = require('../controller/UserController');
const verifyToken = require('../middleware/tokenverify');

// Rotas
router.post('/user/register', userController.registerUser.bind(userController));
router.post('/user/auth', userController.authenticateUser.bind(userController));
router.get("/user/list", userController.find.bind(userController));
router.post('/user/chagePassowrd', verifyToken, userController.changePassword.bind(userController));
router.delete('/user/delete/:id', verifyToken, userController.deleteUser.bind(userController))
router.use((req, res) => {
    res.type("application/json");
    res.status(404).send("404 - Not Found")
});

module.exports = router;
const userController = require('./userController');
const express = require('express');
const Router = express();

Router.post('/register', userController.registerUser);

Router.post('/login', userController.loginUser);

Router.get('./logout', userController.logoutUser);

module.exports = Router ; 
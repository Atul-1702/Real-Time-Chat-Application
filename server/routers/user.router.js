
const userRouter = require('express').Router();
const { getUserDetails, getAllUserDetails } = require('../controllers/user.controller');
const AuthMiddleware = require('../middlewares/auth.middleware');
const asyncFuncErrorHandler = require('../utils/asyncFuncErrorHandler');

userRouter.get('/user-details',AuthMiddleware,asyncFuncErrorHandler(getUserDetails));
userRouter.get('/all-user-details',AuthMiddleware,asyncFuncErrorHandler(getAllUserDetails));

module.exports = userRouter;
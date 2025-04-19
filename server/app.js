const express = require('express');
const authRouter = require('./routers/auth.router');
const { globalErrorHandler } = require('./controllers/errors.controller');

const app=express();

app.use(express.json());
app.use('/api/user/auth',authRouter);
app.use(globalErrorHandler);


module.exports = app;


// imports
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const cors = require('cors');
const mongoose = require('mongoose');

// routes
const indexRouter = require('./routes/index');
const verifyAccessToken = require('./routes/middlware/veridyAccessTokenMiddleware');
const usersRouter = require('./routes/users');

// mogodb configurations
// pass: 
mongoose.connect(
  'mongodb+srv://gilvanh:Wa1B68k4axXr8vSp@development.oyten.mongodb.net/cadernovirtualdb?retryWrites=true&w=majority', {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => {
  console.log('Mongoose connection ok!');
}).catch((err) => {
  console.log(err);
});

// app configurations
const app = express();

app.use(cors());
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// routes configurations
app.use(verifyAccessToken, indexRouter);
app.use(usersRouter);

module.exports = app;

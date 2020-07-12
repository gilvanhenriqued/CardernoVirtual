// imports
require("dotenv").config();

const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const cors = require('cors');
const mongoose = require('mongoose');

// routes
const verifyAccessToken = require('./routes/middlware/veridyAccessTokenMiddleware');
const indexRouter = require('./routes/index');
const usersRouter = require('./routes/users');
const annotationsRouter = require('./routes/annotations');

// mogodb configurations
// pass: 

mongoose.connect(
  process.env.MONGO_URL, {
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
app.use(indexRouter);
app.use(usersRouter);
app.use(verifyAccessToken, annotationsRouter);

app.listen(process.env.PORT || 3000);

module.exports = app;

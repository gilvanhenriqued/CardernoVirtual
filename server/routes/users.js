const express = require('express');
const router = express.Router();
const Users = require('../models/users');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

/* POST users - signup*/
router.post('/users', async function(req, res) {
  try {
    const newUser = new Users({
      username: req.body.username,
      password: bcrypt.hashSync(req.body.password, 10),
    });

    await newUser.save();
    return res
      .status(201)
      .json("User successfully created!");
      
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({
        msg: "New user cannot be created...",
        error
      });
  }
});

/* POST users - authenticate*/
router.post('/authenticate', async function(req, res) {
  try {
    const user = await Users.findOne({
      username: req.body.username,
    });

    if (!user || !bcrypt.compareSync(req.body.password, user.password)) {
      return res
        .status(400)
        .json({ msg: "Unable to authenticate the user with the entered data..."});
    }

    const token = jwt.sign({
      username: user.username,
    }, 'TOP_SECRET');

    return res
      .status(200)
      .json({
        msg: "User successfully authenticated!",
        username: user.username,
        token
      });
      
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({
        msg: "Error trying to authenticated...",
        error
      });
  }
});

module.exports = router;

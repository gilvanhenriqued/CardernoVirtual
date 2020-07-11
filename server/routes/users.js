const express = require('express');
const router = express.Router();
const Users = require('../models/users');
const bcrypt = require('bcrypt');

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

module.exports = router;

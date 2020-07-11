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

/* GET user by ID*/
router.get('/users/:id', async function(req, res) {
  try {
    const user = await Users.findById(req.params.id);

    if(!user) {
      return res
        .status(400)
        .json({ msg: "User not found..."});
    }

    return res
      .status(200)
      .json(user);
    
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({
        msg: "Error trying to get user data...",
        error
      });
  }
});

/* PUT UPDATE user by ID*/
router.put('/users/:id', async function(req, res) {
  try {
    if (!req.body.username || !req.body.password) {
      return res
        .status(400)
        .json({ msg: "Required fields cannot be empty..."});
    }

    let user = await Users.findByIdAndUpdate(req.params.id, req.body, { new: true });
    
    return res
      .status(200)
      .json(user);
    
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({
        msg: "Error trying to update user data...",
        error
      });
  }
});

module.exports = router;
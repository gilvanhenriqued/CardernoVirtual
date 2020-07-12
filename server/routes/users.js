const express = require('express');
const router = express.Router();
const Users = require('../models/users');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const response = require('./middlware/response');
const verifyAccessToken = require('./middlware/veridyAccessTokenMiddleware');

// POST – To create a new user (localhost:3000/users)
router.post('/users', async function(req, res) {
  const user = new Users({
    username: req.body.username,
    password: bcrypt.hashSync(req.body.password, 10),
    name: req.body.name
  });

  await user.save()
  .then((user) => {
    response(res, true, "User successfully created!", user, 201);
  }, (error) => {
    response(res, false, "New user cannot be created...", error, 500);
  });

});

// POST – To authenticate (localhost:3000/authenticate)
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

// GET – To get a user by ID (localhost:3000/users/:id)
router.get('/users/:id', verifyAccessToken, async function(req, res) {

  await Users.findById(req.params.id)
  .exec()
  .then((user) => {
    response(res, true, "User data successfully accessed!", user, 200);
  }, (error) => {
    response(res, false, "Failed trying get the user...", error, 500);
  });

});

// PUT – To update a user by ID (localhost:3000/users/:id)
router.put('/users/:id', async function(req, res) {
  try {
    if (!req.body.username || !req.body.password || !req.body.name) {
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

// DELETE – To remove a user by ID (localhost:3000/users/:id)
router.delete('/users/:id', async function(req, res) {
  await Users.findByIdAndRemove(req.params.id)
    .then((user) => {
      if(!user) {
        return res
          .status(404)
          .json({ msg: "User not found!"});
      }
 
      return res
        .status(200)
        .json({ msg: "User deleted successfully!"});
    }).catch((error) => {
      console.log(error);
      return res
        .status(500)
        .json({
          msg: "Error trying to delete user...",
          error
        });
    });
});


module.exports = router;
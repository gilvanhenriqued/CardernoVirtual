const User = require('../../models/users');
const jwt = require('jsonwebtoken');
const Users = require('../../models/users');

module.exports = async (req, res, next) => {
  try {
    if (!req.headers['authorization']) {
      return res
        .status(400)
        .json({ msg: "Acess token not informed..."});
    }
    
    const token = req.headers['authorization'].split(' ');
    
    if (token[0] !== 'Bearer') {
      return res
        .status(400)
        .json({ msg: "Acess token informed but with a invalid format..."});
    }

    const user = await jwt.verify(token[1], 'TOP_SECRET');

    req.body.user = await Users.findOne({username: user.username});

    next();
  } catch (error) {
    console.log(error);
    return res
      .status(400)
      .json({ msg: "Not was possible validate the token..."});

  }
}
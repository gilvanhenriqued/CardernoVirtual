const mongoose = require('mongoose');

const Users = mongoose.model('User', new mongoose.Schema({
  username: {type: String, required: true, unique: true},
  password: {type: String, required: true, minlength: 6},
  name: {type: String, required: true, minlength: 3}
}));

module.exports = Users;
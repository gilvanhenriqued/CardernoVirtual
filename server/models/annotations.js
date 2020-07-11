const mongoose = require('mongoose');

const Annotations = mongoose.model('Annotation', new mongoose.Schema({
  author: {type: String, required: true, unique: true},
  title: {type: String, required: true},
  description: {type: String, required: true},
  publicationDate: {type: Date, default: Date.now},
  subjectsTags: [String]
}));

module.exports = Annotations;
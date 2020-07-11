const mongoose = require('mongoose');

const Annotations = mongoose.model('Annotation', new mongoose.Schema({
  author: {type: String, required: true},
  title: {type: String, required: true},
  description: {type: String, required: true},
  publicationDate: {type: Date},
  isPublic: {type: Boolean, required: true},
  subjectsTags: [String]
}));

module.exports = Annotations;
const mongoose = require('mongoose');

const Annotations = mongoose.model('Annotation', new mongoose.Schema({
  author_id: {type: String, required: true},
  author_name: {type: String, required: true},
  title: {type: String, required: true},
  description: {type: String, required: true},
  publication_date: {type: Date},
  is_public: {type: Boolean, required: true},
  subjects_tags: [String]
}));

module.exports = Annotations;
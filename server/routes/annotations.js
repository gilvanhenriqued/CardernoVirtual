const express = require('express');
const router = express.Router();
const Annotations = require('../models/annotations');
const Users = require('../models/users');

// POST – To create a new annotation (localhost:3000/annotations)
router.post('/annotations', async (req, res) => {

  const annotation = new Annotations ({
    author_id: req.body.user._id,
    author_name: req.body.user.name,
    title: req.body.title,
    description: req.body.description,
    publication_date: new Date(),
    is_public: req.body.is_public,
    subjects_tags: req.body.subjects_tags
  });

  await annotation.save()
    .then((annotation) => {
      response(res, true, "Annotation successfully registered!", annotation, 201);
    }, (error) => {
      response(res, false, "Failed trying create annotation...", error, 500);
    });
});

// GET – To get the public annotations (localhost:3000/annotations)
router.get('/annotations', async (req, res) => {
  await Annotations.find({})
    .exec()
    .then((annotations) => {
      response(res, true, "Annotations listed!", annotations, 200);
    }, (error) => {
      response(res, false, "Failed trying list annotations...", error, 500);
    });
});

// GET – To get a annotation by id (localhost:3000/annotations/:id)
router.get('/annotations/:id', async (req, res) => {
  await Annotations.findById(req.params.id)
    .exec()
    .then((annotation) => {
      response(res, true, "Annotations data accessed!", annotation, 200);
    }, (error) => {
      response(res, false, "Failed trying get the annotation...", error, 500);
    });
});

// GET – To get the annotations by author_id (localhost:3000/userAnnotations/:author_id)
router.get('/userAnnotations/:author_id', async (req, res) => {
  await Annotations.find({ author_id: req.params.author_id })
    .exec()
    .then((annotations) => {

      Users.findById(req.params.author_id)
        .exec()
        .then((user) => {
          response(res, true, "Annotations successfully listed!", annotations, 200);
        }, (error) => {
          response(res, false, "User not found...", error, 404);
        });

    }, (error) => {
      response(res, false, "Failed trying get the annotations...", error, 500);
    });
});

// PUT – To update a annotation by id (localhost:3000/annotations/:id)
router.put('/annotations/:id', async (req, res) => {
  const newAnnotation = {
    _id: req.params.id,
    author_id: req.body.user._id,
    author_name: req.body.user.name,
    title: req.body.title,
    description: req.body.description,
    publication_date: new Date(),
    is_public: req.body.is_public,
    subjects_tags: req.body.subjects_tags
  };

  await Annotations.findByIdAndUpdate(req.params.id, newAnnotation, { new: true })
    .then((annotation) => {
      response(res, true, "Annotation successfully updated!", annotation, 200);
    }, (error) => {
      response(res, false, "Failed trying update annotation...", error, 500);
    });
});

// DELETE – To remove a annotation by id (localhost:3000/annotations/:id)
router.delete('/annotations/:id', async (req, res) => {
  await Annotations.findByIdAndRemove(req.params.id)
    .then((annotation) => {
      response(res, true, "Annotation deleted successfully!", annotation, 200);
    }, (error) => {
      response(res, false, "Failed trying remove the annotation...", error, 500);
    });
});


// function to optimizate the responses
function response(res, success=true, msg="", result, status){
  return res
  .status(status)
  .json({
    success: success,
    msg: msg,
    result: result,
    status: status
  });
}

module.exports = router;
const express = require('express');
const router = express.Router();
const Annotations = require('../models/annotations');

// POST – To create a new annotation (localhost:3000/annotations)
router.post('/annotations', async (req, res) => {
  const annotation = new Annotations ({
    author: req.body.author,
    title: req.body.title,
    description: req.body.description,
    publicationDate: new Date(),
    isPublic: req.body.isPublic,
    subjectsTags: req.body.subjectsTags
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





// function to optimizate the responses
function response(res, success=true, msg="", result, status){
  return res
  .status(status)
  .json({
    success: success,
    msg: msg,
    result: result
  });
}

module.exports = router;
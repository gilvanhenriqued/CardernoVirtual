const express = require('express');
const router = express.Router();
const Annotations = require('../models/annotations');

// POST – To create a new annotation (http://localhost:8080/api/mensagens)
router.post('/annotations', async (req, res) => {
  const annotation = new Annotations ({
    author: req.body.author,
    title: req.body.title,
    description: req.body.description,
    publicationDate: new Date(),
    subjectsTags: req.body.subjectsTags
  });

  await annotation.save()
    .then((annotation) => {
      response(res, true, "Annotation successfully registered!", annotation, 201)
    }, (error) => {
      response(res, false, "Failed trying create annotation...", error, 500)
    });
})

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
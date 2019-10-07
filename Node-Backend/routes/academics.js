const express = require('express');
const router = express.Router();
const academics = require('../models/academics');
const config = require('../config/database');
const multer = require('multer');
const DIR = './uploads/';
const upload = multer({ dest: DIR }).single('photo');


router.post('/uploadsfile', function (req, res, next) {
  console.log("hello")
  var path = '';
  upload(req, res, function (err) {
    if (err) {
      // An error occurred when uploading
      console.log(err);
      return res.status(422).send("an Error occured")
    }
    // No error occured.
    path = req.file.path;
    return res.send("Upload Completed for " + path);
  });
});

module.exports = router;
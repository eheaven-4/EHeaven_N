const express = require('express');
const router = express.Router();
const acad = require('../models/academics');
const config = require('../config/database');
const multer = require('multer');

var path = require('path');
var fs = require('fs');

var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/')
  },
  filename: function (req, file, cb) {
    console.log(req)
    cb(null, file.originalname)
    // console.log(file.originalname)
  }
});


var upload = multer({ storage: storage }).single('profileImage');

router.post('/uploadfile', function (req, res) {
  upload(req, res, (err) => {
    console.log(req.file)
    var fullPath = req.file.destination  + req.file.originalname;
    var document = {
      path: fullPath,
      name: req.body.name
    };

    var photo = new acad(document);
    photo.save()
      .then(result => {
        console.log(result)
        res.json({ state: true, msg: "Data Inserted Successfully..!" });
      })
      .catch(error => {
        console.log(error)
        res.json({ state: false, msg: "Data Inserting Unsuccessfull..!" });
      })
  })
});

router.get("/profileImage/:id", function(req, res) {
  console.log("hello")
  const id = req.params.id;
  console.log(id)
  res.sendFile(path.join(__dirname, '../uploads/'+id+'.jpg'));
});

module.exports = router;
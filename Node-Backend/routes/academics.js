const express = require('express');
const router = express.Router();
const academicStuff = require('../models/academics');
const config = require('../config/database');
const multer = require('multer');

var path = require('path');
var fs = require('fs');

var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'local_storage/academic_Stuff/')
  },
  filename: function (req, file, cb) {
    console.log(req)
    cb(null, file.originalname)
    // console.log(file.originalname)
  }
});


var upload = multer({ storage: storage }).single('academic_stuff');

router.post('/addStuff', function (req, res) {
  console.log("hello")
  upload(req, res, (err) => {
    console.log(req.file)
    var fullPath = req.file.originalname;
    var document = {
      userid: req.body.userid,
      teachername: req.body.teachername,
      subject: req.body.subject,
      attachmenttype: req.body.attachmenttype,
      grade: req.body.grade,
      path: fullPath,
    };

    var photo = new academicStuff(document);
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
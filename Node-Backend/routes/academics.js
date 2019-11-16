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
    cb(null, "ACA_"+ file.originalname)
    // console.log(file.originalname)
  }
});


var upload = multer({ storage: storage }).single('academic_stuff');

//Add the academic lecture notes function
router.post('/addStuff', function (req, res) {
  console.log("hello")
  upload(req, res, (err) => {
    console.log(req.file)
    var fullPath = "ACA_"+req.file.originalname;
    var document = {
      userid: req.body.userid,
      teachername: req.body.teachername,
      subject: req.body.subject,
      attachmenttype: req.body.attachmenttype,
      class: req.body.class,
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


//show academic attachment for students
router.get("/acad&stu&attachment/:class/:subName", function(req, res) {
  const className = req.params.class
  const subjectName = req.params.subName
  academicStuff.find({class : className, subject: subjectName})
        .select('userid teachername subject attachmenttype class path')
        .exec()
        .then(docs => {
            console.log("Data Transfer Success.!");
            res.status(200).json(docs);
        })
        .catch(error => {
            console.log(error);
            res.status(500).json({
                error: error
            });
        });
})

//show academic attachment for others
router.get("/acad&other&attachment/:userid/:subName", function(req, res) {
  const userid = req.params.userid
  const subjectName = req.params.subName

  academicStuff.find({userid : userid, subject: subjectName})
        .select('userid teachername subject attachmenttype class path')
        .exec()
        .then(docs => {
            console.log("Data Transfer Success.!");
            res.status(200).json({state: true, msg: 'Data Transfer Success.!', data : docs});
        })
        .catch(error => {
            console.log(error);
            res.status(500).json({
                error: error
            });
        });
})

//get attachment 
router.get("/academicAttachment/:filename", function(req, res) {
  const filename = req.params.filename;
  res.sendFile(path.join(__dirname, '../local_storage/academic_Stuff/' + filename));
});

//delete academic attachment details
router.delete("", function(req,res) {

})

//delete academic attachment from local_storage
router.delete("", function(req,res) { 

})
module.exports = router;
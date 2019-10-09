const express = require('express');
const router = express.Router();
const academics = require('../models/academics');
const config = require('../config/database');
const multer = require('multer');

var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/')
  },
  filename: function (req, file, cb) {
    cb(null, file.fieldname + '-' + Date.now() + '.jpg')
  }
})

const upload = multer({ storage: storage }).single('profileImage');

router.post('/uploadfile', function (req, res) {
  upload(req, res, (err) => {
    if (err) {
      res.json({ state: false, msg: "Did not insert new attendance" });
    }
    if (req) {
      res.json({ state: true, msg: "New Attendence inserted" });
    }
  })
});

module.exports = router;
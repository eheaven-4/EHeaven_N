// const IncomingForm = require('formidable').IncomingForm;
const express = require('express');
const router = express.Router();
const multer =require('multer');
const attendance = require('../models/filehandler');
const config = require('../config/database');
const users=require('../models/users');


var sotore=multer.diskStorage({
  destination:function(req,file,cb){
    cb(null,'/upload');
  },
  filename:function(req,file,cb){
    cb(null,Data.now()+'_'+file.originalname);
  }
});
var upload=multer({storage:sotore}).single('file');

router.post("/upload",function(req, res) {
  console.log("hiii");
  upload(req,res,function(err){
    if(err){
      return res.status(501).json({error:err});
    }

    return res.json({originalname:req.file.originalname,uploadname:req.file.filename});
  });
});

module.exports = router;
 
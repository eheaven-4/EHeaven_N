const express = require('express');
const router = express.Router();
const Notification = require('../models/notification');
const config = require('../config/database');


router.post("/add",function(req,res) {
    console.log("hello");
    const newNotice = new Notification ({
        userid:req.body.userid,
        subject:req.body.subject,
        message:req.body.message,
        date:req.body.date
    });
    console.log(newNotice);
    Notification.saveNotice(newNotice, function(err,user){
        if(err){
            res.json({state : false, msg: "Data inserting Unsuccessfull..!"});
        }
        if(user){
            res.json({state : true, msg: "Data inserted Successfully..!"});
        }
    });
});

module.exports = router;  
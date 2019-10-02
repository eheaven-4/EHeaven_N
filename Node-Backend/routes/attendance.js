const express = require('express');
const router = express.Router();
const attendance = require('../models/attendance');
const config = require('../config/database');
const users=require('../models/users');

router.post("/addLog",function(request,response){
    console.log("hello");
    var today=new Date();
    var todaystr=today.getFullYear()+"/"+(today.getMonth()+1)+"/"+today.getDate();
    const stu=new attendance({
        userid:request.body.username,
        attend:request.body.attend,
        date:todaystr,
        class:request.body.class
    });
    console.log(stu);
    attendance.addAttendance(stu,function (err,req){
        if(err){
            response.json({state:false,msg:"Did not insert new attendance"});
        }
        if(req){
            response.json({state:true,msg:"New Attendence inserted"});
        }
    });

});


router.get("/received", function (req, res) {
    users.find({})
    .exec(function(err,data){
        if(err){
            console.log("Error");
        }else{
            res.json(data);
        }
    });
    
});

router.get("/searchDate/:date", function (req, res) {
    console.log("serchdate");
    console.log(req.params.date);
    attendance.find({date:req.params.date})
    .exec(function(err,data){
        if(err){
            console.log("Error");
        }else{
            console.log(data);
            res.json(data);
        }
    });
    
});

router.get("/searchStu/:userid", function (req, res) {
    console.log("serchStudent");
    users.find({userid:req.params.userid})
    .exec(function(err,data){
        if(err){
            console.log("Error");
        }else{
            console.log(data);
            res.json(data);
        }
    });
    
});


module.exports = router;


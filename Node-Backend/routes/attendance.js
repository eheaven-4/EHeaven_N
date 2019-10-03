const express = require('express');
const router = express.Router();
const attendance = require('../models/attendance');
const config = require('../config/database');
const users=require('../models/users');

router.post("/addLog",function(request,response){
    console.log("hello");
    var today=new Date();
    var year=today.getFullYear();
    var date=today.getDate();
    var month=function(){
        if(today.getMonth()<9){
            return ('0'+(today.getMonth()+1));
        }else{
            return today.getMonth()+1;
        }
    }
    var todaystr=year+"/"+month+"/"+date;
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

router.get("/searchDate", function (req, res) {
    console.log("searchdate");
    var inputdate = req.query.date;
    console.log(inputdate);
    attendance.find({date:inputdate})
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
    attend.find({userid:req.params.userid})
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


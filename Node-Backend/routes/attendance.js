const express = require('express');
const router = express.Router();
const attendance = require('../models/attendance');
const config = require('../config/database');

router.post("/",function(request,response){
    console.log("hello");
    var today=new Date();
    var todaystr=today.getFullYear()+"/"+(today.getMonth()+1)+"/"+today.getDate();
    const stu=new attendance({
        userid:request.body.name,
        attend:request.body.attend,
        date:todaystr,
        class:"1-A"
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

module.exports = router;


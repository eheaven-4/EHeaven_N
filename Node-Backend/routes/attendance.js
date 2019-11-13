const express = require('express');
const router = express.Router();
const attendance = require('../models/attendance');
const config = require('../config/database');
const users=require('../models/users');

router.post("/addLog",function(request,response){
    console.log("hello");
    var today=new Date();
    var year=today.getFullYear();
    var date='';
    var month='';
    if(today.getMonth()<9){
        month=('0'+(today.getMonth()+1));
    }else{
        month=today.getMonth()+1;
    }
    
    date=today.getDate();
    
    
    var todaystr=month+"/"+date+"/"+year;
    const stu=new attendance({
        username:request.body.username,
        userid:request.body.userid,
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

router.get("/searchStu/:stu/:month", function (req, res){
    console.log(req.params.stu,req.params.month);
    var date = new RegExp("^" + req.params.month);
    // ({
    //     $or : [ 
    //         {"userid": req.params.userid},
    //         {"username": req.params.userid}
    //     ],
    //     "class": "1-A"         
    // })
    ({$and:[{$or:[{userid:req.params.userid},{username:req.params.userid}]},{class:'1-A'}]})
    attendance.find({
        $and:[
            {$or:[{userid:req.params.stu},{username:req.params.stu}]},
            {date:date}
        ]
    })
    
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


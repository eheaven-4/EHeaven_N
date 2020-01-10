const express = require('express');
const router = express.Router();
const mark = require('../models/mark');
const config = require('../config/database');
// const users=require('../models/users');


router.post("/addLog",function(request,response){
    console.log("hello");

    const newmarksheet=new mark({
        classname:request.body.classname,
        year:request.body.year,
        term:request.body.term,
        marks:request.body.marks
    });
    // console.log(newmarksheet);
    mark.addMark(newmarksheet,function (err,req){
        if(err){
            console.log(err);
            response.json({state:false,msg:"Did not insert new attendance"});
        }
        if(req){
            response.json({state:true,msg:"New Attendence inserted"});
        }
    });

});

module.exports = router;
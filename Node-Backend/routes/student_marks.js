const express = require('express');
const router = express.Router();
const mark = require('../models/student_marks');
const config = require('../config/database');
// const users=require('../models/users');


router.post("/addLog", function (request, response) {
    console.log("hello");

    const newmarksheet = new mark({
        classname: request.body.classname,
        year: request.body.year,
        term: request.body.term,
        marks: request.body.marks,
        subject: request.body.subject
    });
    // console.log(newmarksheet);
    mark.addMark(newmarksheet, function (err, req) {
        if (err) {
            console.log(err);
            response.json({ state: false, msg: "Did not insert new attendance" });
        }
        if (req) {
            response.json({ state: true, msg: "New Attendence inserted" });
        }
    });

});


//find one student data
router.post("/studentAverage", function (req, res) {
    const year = req.body.year
    const term = req.body.term
    const userid = req.body.userid
    const classname = req.body.classname

    var stuPosition;
    var stuAverage;
    var arr1 = new Array();
    mark.aggregate([
        {
            $match: { "year": year, "term": term, "classname": classname }
        },
        {
            $unwind: "$marks"
        },
        {
            $group: {
                _id: "$marks.userid",
                avg: { $avg: { $toInt: "$marks.mark" } },
            }
        }
    ])
        .sort({ _id: 1 })
        .exec()
        .then(function (resp) {
            var i = 0;
            for (i = 0; i < resp.length; i++) {
                arr1.push(resp[i])
            }

            var j = 0
            for (j = 0; j < arr1.length; j++) {
                if (arr1[j]._id == userid) {
                    stuPosition = j + 1
                    stuAverage = Math.floor(arr1[j].avg).toFixed(4)
                }
            }
            res.send({
                state: true,
                data :{
                stuPosition: stuPosition,
                stuAverage: stuAverage,
                classname : classname
                }
            })
        });
})


//find all students marks data with final marks
router.post("/classAverages", function (req, res) {
    const year = req.body.year
    const term = req.body.term
    // const subject = req.params.subject
    const classname = req.body.classname

    var arr2 = new Array();
    
    mark.aggregate([
        {
            $match: { "year": year, "term": term, "classname": classname }
        },
        {
            $unwind: "$marks"
        },
        {
            $group: {
                _id: "$marks.userid",
                avg: { $avg: { $toInt: "$marks.mark" } }
            }
        }
    ])
        .sort({ _id: 1 })
        .exec()
        .then(function (resp) {
            var i = 0;
            for (i = 0; i < resp.length; i++) {
                arr2.push(resp[i])
            }

            var j = 0
            for (j = 0; j < arr2.length; j++) {
                console.log(arr2[j]);   
            }
            res.send(arr2)
        });
})

//search with subject teacher

module.exports = router;
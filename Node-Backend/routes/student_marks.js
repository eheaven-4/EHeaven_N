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
        subId: request.body.subId
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


//find one student data (student position, and the avarage)
router.post("/studentAverage", function (req, res) {
    var year = (req.body.year).toString();
    var term = (req.body.term).toString();
    var classname = req.body.classname
    var userid = (req.body.userid).toString();
    
    var stuPosition = 0;
    var stuAverage =0;
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
                stuPosition: stuPosition,
                stuAverage: stuAverage,
                classname: classname
            })
        });
})


//find all students marks data with final marks(for teacher)
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


class stuSubMarks {
    constructor(year, term, subject, subId, marks) {
        this.year = year;
        this.term = term;
        this.subject = subject;
        this.subId = subId;
        this.marks = marks
    }
}
//search subjects with marks
router.get("/subjectMarks/:id", function (req, res) {
    const userid = req.params.id;

    var date = new Date();
    const thisYear = date.getFullYear();
    const lastYear = thisYear - 1;

    var arr2 = new Array();   //all data push to this array
    var arr1 = new Array();

    mark.find({ year: { $gte: lastYear } })
        .exec()
        .then(docs => {
            var i = 0;
            for (i = 0; i < docs.length; i++) {
                arr2.push(docs[i])
            }
            var j = 0
            // res.send(arr2)
            for (j = 0; j < arr2.length; j++) {
                arr2[j].marks.forEach(element => {
                    if (element.userid == userid) {
                        var subMarks = new stuSubMarks(arr2[j].year, arr2[j].term, arr2[j].subject, arr2[j].subId, element.mark)
                        arr1.push(subMarks)
                    }
                });
            }
            // console.log(arr1);
            
            res.send(arr1)
        })
        .catch(error => {
            console.log(error);
            res.status(500).json({
                error: error
            });
        });
});


//get subject details to the student clicking subject
class stuYearMarks {
    constructor(term, marks) {
        this.term = term
        this.marks = marks
    }
}   
router.post("/subjectData", function(req,res){
    const subId = req.body.subId
    const year = req.body.year
    const userid = req.body.userid
    
    var arr2 = new Array();   //all data push to this array
    var arr1 = new Array();
    mark.find({ year: year, subId: subId })
        .exec()
        .then(docs => {
            var i = 0;
            for (i = 0; i < docs.length; i++) {
                arr2.push(docs[i])
            }
            var j = 0

            for (j = 0; j < arr2.length; j++) {
                arr2[j].marks.forEach(element => {
                    if (element.userid == userid) {
                        var st = new stuYearMarks(arr2[j].term,element.mark)
                        arr1.push(st)
                    }
                });
            }
            res.send(arr1)
        })
        .catch(error => {
            console.log(error);
            res.status(500).json({
                error: error
            });
        });
})

module.exports = router;
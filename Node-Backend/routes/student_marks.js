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
    var stuAverage = 0;
    var dataArray2 = new Array();
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
                avg: { $avg: { $toDouble: "$marks.mark" } }
            }
        },
        { $sort: { avg: -1 } }
    ])
        .sort({ _id: 1 })
        .exec()
        .then(function (resp) {
            var i = 0;
            for (i = 0; i < resp.length; i++) {
                dataArray2.push(resp[i])
            }

            var j = 0
            for (j = 0; j < dataArray2.length; j++) {
                if (dataArray2[j]._id == userid) {
                    stuPosition = j + 1
                    stuAverage = Math.floor(dataArray2[j].avg).toFixed(4)
                }
            }
            res.send({
                stuPosition: stuPosition,
                stuAverage: stuAverage,
                classname: classname
            })
        });
})

//search subjects with marks
router.get("/subjectMarks/:id", function (req, res) {
    const userid = req.params.id;

    var date = new Date();
    const thisYear = date.getFullYear();
    const lastYear = thisYear - 1;

    var dataArray1 = new Array();   //all data push to this array
    var dataArray2 = new Array();

    mark.find({ year: { $gte: lastYear } })
        .exec()
        .then(docs => {
            var i = 0;
            for (i = 0; i < docs.length; i++) {
                dataArray1.push(docs[i])
            }
            var j = 0
            // res.send(dataArray1)
            for (j = 0; j < dataArray1.length; j++) {

                dataArray1[j].marks.forEach(element => {
                    if (element.userid == userid) {
                        var subMarks = new stuSubMarks(dataArray1[j].classname, dataArray1[j].year, dataArray1[j].term, dataArray1[j].subject, dataArray1[j].subId, element.mark)
                        dataArray2.push(subMarks)
                    }
                });
            }
            // for(var i=0; i<dataArray2.length; i++){
            //     console.log(dataArray1.length);
            // }

            res.send(dataArray2)
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
router.post("/subjectData", function (req, res) {
    const subId = req.body.subId
    const year = req.body.year
    const userid = req.body.userid
    console.log(req.body);

    var dataArray1 = new Array();   //all data push to this array
    var dataArray2 = new Array();
    mark.find({ year: year, subId: subId })
        .exec()
        .then(docs => {
            var i = 0;
            for (i = 0; i < docs.length; i++) {
                dataArray1.push(docs[i])
            }
            var j = 0

            for (j = 0; j < dataArray1.length; j++) {
                dataArray1[j].marks.forEach(element => {
                    if (element.userid == userid) {
                        var st = new stuYearMarks(dataArray1[j].term, element.mark)
                        dataArray2.push(st)
                    }
                });
            }
            res.send(dataArray2)
        })
        .catch(error => {
            console.log(error);
            res.status(500).json({
                error: error
            });
        });
})

//get all student data and marks table for spesific subject
class allStuMarks {
    constructor(userid, marks, name) {
        this.userid = userid
        this.marks = marks
        this.name = name
    }
}
router.post("/subjectAllStuData", function (req, res) {
    const subId = req.body.subId
    const year = req.body.year
    const term = req.body.term
    const classname = req.body.classname

    // const userid = req.body.userid
    console.log(req.body);

    var dataArray1 = new Array();     //all data push to this array
    var dataArray2 = new Array();
    mark.find({
        classname: classname,
        year: year,
        term: term,
        subId: subId,
    })
        .exec()
        .then(docs => {
            var i = 0;
            for (i = 0; i < docs.length; i++) {
                dataArray1.push(docs[i])
            }
            var j = 0
            for (j = 0; j < dataArray1.length; j++) {
                dataArray1[j].marks.forEach(element => {

                    var st = new allStuMarks(element.userid, element.mark, element.name)
                    dataArray2.push(st)
                });
            }
            res.send(dataArray2)
        })
        .catch(error => {
            res.status(500).json({
                error: error
            });
        });
})

//teacher part ********************************************************************************
//find all students marks data with final marks(for teacher)
class allStuAverage {
    constructor(userid, username, average, year, term, classname) {
        this.userid = userid
        this.username = username
        this.average = average
        this.year = year
        this.term = term
        this.classname = classname
    }
}
/*this class is use to enter data with position of the student in to the dataArray4()*/
class allStuSortAve {
    constructor(position,userid, username, average, year, term, classname) {
        this.position = position
        this.userid = userid
        this.username = username
        this.average = average
        this.year = year
        this.term = term
        this.classname = classname
    }
}

router.post("/classAverages", function (req, res) {
    const year = req.body.year
    const term = req.body.term
    const classname = req.body.classname

    var dataArray1 = new Array();
    var dataArray2 = new Array();
    var dataArray3 = new Array();
    var dataArray4 = new Array();

    mark.find({ "year": year, "term": term, "classname": classname })
        .select()
        .exec()
        .then(function (docs) {
            var i = 0;

            for (i = 0; i < docs.length; i++) {
                dataArray1.push(docs[i])
            }
            var j = 0
            for (j = 0; j < dataArray1.length; j++) {
                dataArray1[j].marks.forEach(element => {
                    var st = new allStuMarks(element.userid, element.mark, element.name)
                    dataArray2.push(st)
                });
            }

            for (var i = 0; i < dataArray2.length / docs.length; i++) {
                var total = 0
                var average = 0;

                var userid = dataArray2[i].userid
                var username = dataArray2[i].name

                for (var j = 0; j < dataArray2.length; j++) {
                    if (userid == dataArray2[j].userid) {
                        total = total + dataArray2[j].marks
                    }
                }
                average = parseFloat(total / docs.length).toFixed(4);
                var st = new allStuAverage(userid, username, average, year, term,classname)
                dataArray3.push(st)
            }
            //sorting dataArray3  
            dataArray3.sort(function (a, b) { return b.average - a.average });

            //add data to dataArray4 with student positions
            for(var i =0; i<dataArray3.length; i++){
                var st = new allStuSortAve(i+1,dataArray3[i].userid, dataArray3[i].username, dataArray3[i].average, dataArray3[i].year, dataArray3[i].term,dataArray3[i].classname)
                dataArray4.push(st)
            }
            res.send(dataArray4)
        });
})

class stuSubMarks {
    constructor( subject, subId, marks) {
        this.subject = subject;
        this.subId = subId;
        this.marks = marks
    }
}

/*one student Data*/
router.post("/oneStudentData",function(req,res){
    console.log(req.body)
    const year = req.body.year
    const term = req.body.term
    const classname = req.body.classname
    const userid = req.body.userid
    const average = req.body.average
    const username = req.body.username
    const position = req.body.position

    var dataArray1 = new Array();   //all data push to this array
    var dataArray2 = new Array();

    mark.find({ year: year, term :term, classname:classname })
        .exec()
        .then(docs => {
            var i = 0;
            for (i = 0; i < docs.length; i++) {
                dataArray1.push(docs[i])
            }
            var j = 0
            for (j = 0; j < dataArray1.length; j++) {
                dataArray1[j].marks.forEach(element => {
                    if (element.userid == userid) {
                        var subMarks = new stuSubMarks( dataArray1[j].subject, dataArray1[j].subId, element.mark)
                        dataArray2.push(subMarks)
                    }
                });
            }
            res.send({position,average,username,term,year,classname,userid,dataArray2})
        })
        .catch(error => {
            console.log(error);
            res.status(500).json({
                error: error
            });
        });
})
module.exports = router;
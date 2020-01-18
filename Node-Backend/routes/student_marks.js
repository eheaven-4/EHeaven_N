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


//find student average
router.get("/studentAverage/:userid/:term/:year/:class", function (req, res) {
    const userid = req.params.userid
    const term = req.params.term
    const year = req.params.year
    // const subject = req.params.userid
    const classname = req.params.class

    let marks = []
    mark.aggregate([
        {
            $match: { "year": year, "term": term }
        },
        {
            $unwind: "$marks"
        },
        {
            $group: {
                _id: "$marks.userid",
                sum: { $sum: { $toInt: "$marks.mark" } },
                avg: { $avg: { $toInt: "$marks.mark" } },
            }
        }
    ])
        .sort({ _id: 1 })
        .exec()
        .then(function (resp) {
            res.send(resp)
        });
})

module.exports = router;
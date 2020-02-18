const express = require('express')
const router = express.Router()
const { classTimeTable } = require('../models/class_management')
const { academicSubject } = require('../models/class_management')
const config = require('../config/database')

router.post("/timeTableRegistration", function (req, res) {
    const newData = req.body
    // console.log(newTimeTabl)
    const newTimeTable = new classTimeTable(newData)
    console.log(newTimeTable)
    newTimeTable.save()
        .then(result => {
            console.log(result)
            res.json({ state: true, msg: "Data Inserted Successfully..!" });
        })
        .catch(error => {
            console.log(error)
            res.json({ state: false, msg: "Data Inserting Unsuccessfull..!" });
        })
});

//get all the names and class teachers names of class rooms 
router.get("/classRoomsNames", function (req, res) {
    console.log("Hello ")
    classTimeTable.find()
        .select('className classTeacher')
        .exec()
        .then(docs => {
            console.log("Data Transfer Success.!")
            res.json({ state: true, msg: "Data Transfered Successfully..!", data: docs });
        })
        .catch(error => {
            console.log(error)
            res.json({ state: false, msg: "Data Transfer Unsuccessfull..!" });

        })
});

//get Teachers name using class name 
router.get("/getClassTeacherName/:cName", function (req, res) {
    const cName = req.params.cName;
    classTimeTable.findOne({ className: cName }, function (err, className) {
        if (!className) {
            res.json({ state: false, msg: "No class found..!" });
            return;
        }
        if (className) {
            classTimeTable.findOne({ className: cName })
                .select('classTeacher')
                .exec()
                .then(docs => {
                    console.log("Data Transer Success..!")
                    res.json({ state: true, msg: "Data Transfered Successfully..!", data: docs });
                })
                .catch(error => {
                    console.log(error)
                    res.json({ state: false, msg: "Data Transfer Unsuccessfull..!" });
                })
        }
    })
});

/*Subject registration in to the database*/
router.post("/registerSubject", function (req, res, next) {
    const subid = req.body.subId;

    const newData = req.body
    const newSubject = new academicSubject(newData);

    academicSubject.findOne({ subId: subid }, function (err, subId) {   //check subject already register or not
        if (subId) {
            res.json({ state: false, msg: "Subject Id Already Exist..!" });
            return;
        }
        else {
            newSubject.save()
                .then(result => {
                    console.log(result)
                    res.json({ state: true, msg: "Data Inserted Successfully..!" });
                })
                .catch(error => {
                    console.log(error)
                    res.json({ state: false, msg: "Data Inserting Unsuccessfull..!" });
                })
        }
    })

})

//retrive all the subject 
router.get("/getSubjects", function(req,res) {
    academicSubject.find().sort({ subId: 1 })
    .select('_id subId subName')
    .exec()
    .then(docs => {
        console.log("Data Transfer Success.!");
        res.status(200).json({data : docs})
    })
    .catch(error => {
        console.log(error);
        res.status(500).json({error: error });
    });
})

/*delete already added subject*/
router.delete('/deleteSubject/:_id', function(req, res) {
    const id = req.params._id;
    
    academicSubject.remove({ _id: id })
        .exec()
        .then(result => {
            res.status(200).json({state: true, msg: 'Deleted Successfully..!' });
        })
        .catch(error => {
            console.log(error);
            res.status(500).json({state: false, msg: 'Delete Unsuccessfull..!' });
        });
})

//get class time table details
router.get('/getTimetable/:id', function (req, res) {
    const id = req.params.id
    classTimeTable.findOne({ className: id })
        .exec()
        .then(docs => {
            console.log("Data Transer Success..!")
            res.json(docs);
        })
        .catch(error => {
            console.log(error)
            res.json({ state: false, msg: "Data Transfer Unsuccessfull..!" });
        })
})
module.exports = router; 

const express = require('express');
const router = express.Router();
const classTimeTable = require('../models/class_management');
const config = require('../config/database');

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
            res.status(200).json(docs)
        })
        .catch(error => {
            console.log(error)
            res.status(500).json({
                error: error
            })
        })
});

//get Teachers name using class name 
router.get("/getClassTeacherName/:cName", function(req,res) {
    const cName = req.params.cName;
    classTimeTable.findOne({className : cName})
        .select('classTeacher')
        .exec()
        .then (docs=> {
            console.log("Data Transer Success..!")
            res.status(200).json(docs)
        })
        .catch(error=> {
            console.log(error)
            res.status(500).json({
                error : error
            })
        })
});

module.exports = router; 
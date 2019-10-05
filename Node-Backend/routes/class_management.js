const express = require('express');
const router = express.Router();
const classTimeTable = require('../models/class_management');
const config = require('../config/database');

router.post("/timeTableRegistration", function (req, res) {
    const newTimeTable = new classTimeTable({
        object : req.body
    });
    // new classTimeTable({
        // className: req.body.className,
        // monday: {
        //     1 : req.body
        // 2 : req.body.two,
        // 3 : req.body.three,
            // 4 : req.body.four,
            // 5 : req.body.five,
            // 6 : req.body.six,
            // 7 : req.body.seven,
            // 8 : req.body.eight,
            // },
            // tuesday: {
                //     1 : req.body.one,
                //     2 : req.body.two,
                //     3 : req.body.three,
                //     4 : req.body.four,
                //     5 : req.body.five,
                //     6 : req.body.six,
                //     7 : req.body.seven,
                //     8 : req.body.eight,
                // },
        // wednesday: {
            //     1 : req.body.one,
            //     2 : req.body.two,
            //     3 : req.body.three,
        //     4 : req.body.four,
        //     5 : req.body.five,
        //     6 : req.body.six,
        //     7 : req.body.seven,
        //     8 : req.body.eight,
        // },
        // thursday: {
            //     1 : req.body.one,
        //     2 : req.body.two,
        //     3 : req.body.three,
        //     4 : req.body.four,
        //     5 : req.body.five,
        //     6 : req.body.six,
        //     7 : req.body.seven,
        //     8 : req.body.eight,
        // },
        // friday: {
            //     1 : req.body.one,
        //     2 : req.body.two,
        //     3 : req.body.three,
        //     4 : req.body.four,
        //     5 : req.body.five,
        //     6 : req.body.six,
        //     7 : req.body.seven,
        //     8 : req.body.eight,
        // }
        // });
        console.log(newTimeTable);
        newTimeTable
        .save()
        .then(result => {
            console.log(result)
            res.json({ state: true, msg: "Data Inserted Successfully..!" });
        })
        .catch(error => {
            console.log(error)
            res.json({ state: false, msg: "Data Inserting Unsuccessfull..!" });
        })
        res.send("Success");
});

module.exports = router; 

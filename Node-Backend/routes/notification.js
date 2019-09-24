const express = require('express');
const router = express.Router();
const Notification = require('../models/notification');
const config = require('../config/database');


router.post("/add", function (req, res) {
    console.log("hello");
    const newNotice = new Notification({
        usertype: req.body.usertype,
        userid: req.body.userid,
        subject: req.body.subject,
        message: req.body.message,
        date: req.body.date,
        state: req.body.state
    });
    console.log(newNotice);
    Notification.saveNotice(newNotice, function (err, user) {
        if (err) {
            res.json({ state: false, msg: "Data inserting Unsuccessfull..!" });
        }
        if (user) {
            res.json({ state: true, msg: "Data inserted Successfully..!" });
        }
    });
});

//GET all notices
router.get("/view", (req, res, next) => {
    Notification.find().sort({ date: -1 })
        .select('userid subject message date state usertype')
        .exec()
        .then(docs => {
            console.log("Data Transfer Success.!");
            res.status(200).json(docs);
        })
        .catch(error => {
            console.log(error);
            res.status(500).json({
                error: error
            });
        });
});

//Delete a user by ID
router.delete('/delete/:_id', (req, res, next) => {
    // console.log("Hello");
    const id = req.params._id;
    Notification.remove({ _id: id })
        .exec()
        .then(result => {
            res.status(200).json({
                message: 'Deleted Successfully'
            });
        })
        .catch(error => {
            console.log(error);
            res.status(500).json({
                error: error
            });
        });
});

//Approve botton status update 
router.get('/approve/:_id', (req, res, next) => {
    console.log("Hello world");
    const id = req.params._id;
    console.log(id);
    Notification.update({ _id: id }, {
        $set: {
            state: "Approved"
        }
    })
        .exec()
        .then(result => {
            console.log(result);
            res.status(200).json(result);
        })
        .catch(error => {
            console.log(error);
            res.status(500).json({
                error: error
            });
        });
});


module.exports = router;  
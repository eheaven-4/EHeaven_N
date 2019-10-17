const express = require('express');
const router = express.Router();
const Notification = require('../models/notification');
const config = require('../config/database');
const multer = require('multer');
var path = require('path');

var storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'local_storage/notification_attachment/')
    },
    filename: function (req, file, cb) {
        cb(null, "NOT_FILE - "+file.originalname)
    }
});

const upload = multer({ storage: storage }).single('notification_attachment');

//add notification function 
router.post("/add", function (req, res) {
    upload(req, res, (err) => { //uploading file to the notification_Attachment folder and 
        var filePath = "NOT_FILE - " + req.file.originalname;    //send data to the database
        //get file name 
        
        const newNotice = new Notification({
            userid: req.body.userid,
            subject: req.body.subject,
            message: req.body.message,
            date: req.body.date,
            state: req.body.state,
            filepath: filePath
        });

        newNotice.save()
            .then(result => {
                console.log(result)
                res.json({ state: true, msg: "Data Inserted Successfully..!" });
            })
            .catch(error => {
                console.log(error)
                res.json({ state: false, msg: "Data Inserting Unsuccessfull..!" });
            })
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
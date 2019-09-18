const express = require('express');
const router = express.Router();
const Notification = require('../models/notification');
const config = require('../config/database');


router.post("/add", function (req, res) {
    console.log("hello");
    const newNotice = new Notification({
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
    Notification.find()
        .select('userid subject message date state')
        .exec()
        .then(docs => {
            console.log(docs);
            res.status(200).json(docs);
        })
        .catch(error => {
            console.log(error);
            res.status(500).json({
                error: error
            });
        });
});


router.delete("/delete", function (req, res) {

});

module.exports = router;  
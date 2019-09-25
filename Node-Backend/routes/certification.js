const express = require('express');
const router = express.Router();
const requestCertification = require('../models/certification');
const config = require('../config/database');


router.post("/requestCert", function (req, res) {
    // console.log("Hello");
    const newRequest = new requestCertification({
        userid: req.body.userid,
        certName: req.body.certName,
        certType: req.body.certType,
        examName: req.body.examName,
        examYear: req.body.examYear,
        examIndex: req.body.examIndex,
        state: req.body.state
    });
    console.log(newRequest);
    requestCertification.saveRequest(newRequest, function (err, request) {
        if (err) {
            res.json({ state: false, msg: "Data inserting Unsuccessfull..!" });
        }
        if (request) {
            res.json({ state: true, msg: "Data inserted Successfully..!" });
        }
    });
});


module.exports = router; 
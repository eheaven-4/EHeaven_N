const express = require('express');
const router = express.Router();
const requestCertification = require('../models/certification');
const config = require('../config/database');

/*save date to requesting certificate data on databade */
router.post("/requestCert", function (req, res) {
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

//get pending certificate to issued
router.get("/pendingCert", function(req, res){
    console.log("Hello");
    requestCertification.find({ state: "Pending" })
        .select('userid certName certType examName examYear examIndex state')
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
})

//get issued all certificates 
router.get("/issuedCert", function(req, res){
    console.log("Hello");
    requestCertification.find({ state: "Issued" })
        .select('userid certName certType examName examYear examIndex state')
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
})
module.exports = router; 
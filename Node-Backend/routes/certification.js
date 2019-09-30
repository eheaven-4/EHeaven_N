const express = require('express');
const router = express.Router();
const {requestCertification} = require('../models/certification');
const {requestStudentstatus} = require('../models/certification');
const config = require('../config/database');
const pdfDoc = require('pdf-lib');
const fs = require('fs');

/*save date to requesting certificate data on databade */
router.post("/requestCert", function (req, res) {
    const newRequest = new requestCertification({
        userid: req.body.userid,
        certName: req.body.certName,
        certType: req.body.certType,
        examName: req.body.examName,
        examYear: req.body.examYear,
        examIndex: req.body.examIndex,
        reqDate:req.body.reqDate,
        state: req.body.state
    });
    // console.log(newRequest);
    newRequest
        .save()
        .then(result => {
            console.log(result)
            res.json({ state: true, msg: "Data inserted Successfully..!" });
        })
        .catch(error => {
            console.log(error)
            res.json({ state: false, msg: "Data inserting Unsuccessfull..!" });
        })
});

//get pending certificate to issued  by specific user
router.get("/pendingCert/:id", function (req, res) {
    console.log("Hello");
    const id = req.params.id;
    Certification.requestCertification.find({ state: "Pending" , userid: id})
        .sort({ _id: 1 })
        .select('userid certName certType examName examYear examIndex reqDate state')
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

//get issued all certificates by specific user
router.get("/issuedCert/:id", function (req, res) {
    console.log("Hello");
    const id = req.params.id;
    Certification.requestCertification.find({ state: "Issued", userid: id })
        .sort({ _id: 1 })
        .select('userid certName certType examName examYear examIndex reqDate state')
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

//test function to generate student status pdf
router.post("/studentstatus", async function (req, res)  {
    console.log("hello at server ");
    const newRequest = new requestStudentstatus({
        studentName: req.body.studentName,
        admissionNum: req.body.admissionNum,
        dateofAdmission: req.body.dateofAdmission,
        currentStatus: req.body.currentStatus,
        description: req.body.description,
    });
    console.log(newRequest);
    const uint8Array = fs.readFileSync(__dirname  +'/student.pdf')
    var doc = await pdfDoc.PDFDocument.load(uint8Array);
    const pages = doc.getPages()
    const pageOne = pages[0];
    // pageOne.drawText('bZZZZZZZ');
    pageOne.drawText(
        this.newRequest.studentName,    //hereeee
        {
            x: 100,
          y: 100,
          size: 24,
        },
        );
    const pdfBytes = await doc.save()
    fs.writeFileSync(__dirname + "studentEdit.pdf", pdfBytes)
    res.send("Hello users");
});

module.exports = router; 
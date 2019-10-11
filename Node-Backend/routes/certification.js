const express = require('express');
const router = express.Router();
const { requestCertification } = require('../models/certification');
const { requestStudentstatus } = require('../models/certification');
const { requestCharacterCert } = require('../models/certification');
const { requestLeavingCert } = require('../models/certification');
const { requestAlCert } = require('../models/certification');
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
        reqDate: req.body.reqDate,
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
    requestCertification.find({ state: "Pending", userid: id })
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
    requestCertification.find({ state: "Issued", userid: id })
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

/*******************************generate student status certificate pdf ***************************************/

router.post("/studentstatus", async function (req, res) {
    // console.log("hello at server ");
    const newRequest = new requestStudentstatus({
        studentName: req.body.studentName,
        admissionNum: req.body.admissionNum,
        dateofAdmission: req.body.dateofAdmission,
        description: req.body.description,
        state: req.body.state
    });
    console.log(newRequest);
    const uint8Array = fs.readFileSync(__dirname + '/student.pdf')
    var doc = await pdfDoc.PDFDocument.load(uint8Array);
    const pages = doc.getPages()
    const page = pages[0];
    page.drawText(
        newRequest.studentName,
        {
            x: 200,
            y: 615,
            size: 12,
        },
    );
    page.drawText(
        newRequest.admissionNum,
        {
            x: 215,
            y: 447,
            size: 12,
        },
    );
    page.drawText(
        newRequest.dateofAdmission,
        {
            x: 240,
            y: 580,
            size: 12,
        },
    );
    page.drawText(
        newRequest.description,
        {
            x: 60,
            y: 510,
            size: 12,
        },
    );
    const pdfBytes = await doc.save()
    fs.writeFileSync(__dirname + "studentEdit.pdf", pdfBytes)

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
    // res.send("Hello users");
});

/*******************************generate character certificate pdf ***************************************/

router.post("/charactercert", async function (req, res) {
    console.log("hello at server ");
    const newRequest = new requestCharacterCert({
        studentName: req.body.studentName,
        admissionNum: req.body.admissionNum,
        dateofAdmission: req.body.dateofAdmission,
        description: req.body.description,
        dateofLeaving: req.body.dateofLeaving,
        lastClass: req.body.lastClass,
        lastExam: req.body.lastExam,
        examYear: req.body.examYear,
        academicStatus: req.body.academicStatus,
        moral: req.body.moral,
        leadership: req.body.leadership,
        societies: req.body.societies,
        sports: req.body.sports,
    });
    console.log(newRequest);
    const uint8Array = fs.readFileSync(__dirname + '/Character.pdf')
    var doc = await pdfDoc.PDFDocument.load(uint8Array);
    const pages = doc.getPages()
    const page = pages[0];
    // page.drawText(
    //     newRequest.studentName,
    //     {
    //         x: 200,
    //         y: 615,
    //         size: 12,
    //     },
    // );

    const pdfBytes = await doc.save()
    fs.writeFileSync(__dirname + "characterEdit.pdf", pdfBytes)

});

/*******************************generate leaving certificate pdf ***************************************/

router.post("/leavingcert", async function (req, res) {
    console.log("hello at server ");
    const newRequest = new requestLeavingCert({
        studentName: req.body.studentName,
        admissionNum: req.body.admissionNum,
        dateofAdmission: req.body.dateofAdmission,
        dateofLeaving: req.body.dateofLeaving,
        dateofBirth: req.body.dateofBirth,
        fathersName: req.body.fathersName,
        fathersOccupation: req.body.fathersOccupation,
        fathersAddress: req.body.fathersAddress,
        religion: req.body.religion,
        schoolName: req.body.schoolName,
        schoolType: req.body.schoolType,
        cause: req.body.cause,
        lastClass: req.body.lastClass,
        subjects: req.body.subjects,
    });
    console.log(newRequest);
    const uint8Array = fs.readFileSync(__dirname + '/Leaving.pdf')
    var doc = await pdfDoc.PDFDocument.load(uint8Array);
    const pages = doc.getPages()
    const page = pages[0];
    // page.drawText(
    //     newRequest.studentName,
    //     {
    //         x: 200,
    //         y: 615,
    //         size: 12,
    //     },
    // );

    const pdfBytes = await doc.save()
    fs.writeFileSync(__dirname + "leavingEdit.pdf", pdfBytes)

});

/*******************************generate A/L certificate pdf ***************************************/

router.post("/alcert", async function (req, res) {
    console.log("hello at server ");
    // const newRequest = new requestLeavingCert({
    //     studentName: req.body.studentName,
    //     admissionNum: req.body.admissionNum,
    //     dateofAdmission: req.body.dateofAdmission,
    //     dateofLeaving: req.body.dateofLeaving,
    //     dateofBirth: req.body.dateofBirth,
    //     fathersName: req.body.fathersName,
    //     fathersOccupation: req.body.fathersOccupation,
    //     fathersAddress: req.body.fathersAddress,
    //     religion: req.body.religion,
    //     schoolName: req.body.schoolName,
    //     schoolType: req.body.schoolType,
    //     cause: req.body.cause,
    //     lastClass: req.body.lastClass,
    //     subjects: req.body.subjects,
    // });
    // console.log(newRequest);
    // const uint8Array = fs.readFileSync(__dirname + '/Leaving.pdf')
    // var doc = await pdfDoc.PDFDocument.load(uint8Array);
    // const pages = doc.getPages()
    // const page = pages[0];
    // page.drawText(
    //     newRequest.studentName,
    //     {
    //         x: 200,
    //         y: 615,
    //         size: 12,
    //     },
    // );

    // const pdfBytes = await doc.save()
    // fs.writeFileSync(__dirname + "leavingEdit.pdf", pdfBytes)

});

module.exports = router; 
const express = require('express');
const router = express.Router();
const User = require('../models/users');
const jwt = require('jsonwebtoken');
const config = require('../config/database');
const passport = require('passport');
const multer = require('multer');
const pdfDoc = require('pdf-lib');
const fs = require('fs');

//test hereee for certification
// router.get("/", async function (req, res)  {
//     console.log("hello");
//     const uint8Array = fs.readFileSync(__dirname  +'/student.pdf')
//     var doc = await pdfDoc.PDFDocument.load(uint8Array);
//     const pages = doc.getPages()
//     const pageOne = pages[0];
//     pageOne.drawText('You can modify PDFs too!')
//     const pdfBytes = await doc.save()
//     fs.writeFileSync(__dirname + "studentEdit.pdf", pdfBytes)
//     res.send("Hello users");
// });


router.post("/login", function (req, res,next) {
    const userid = req.body.userid;
    const password = req.body.password;

    User.findByUserid(userid, function (err, user) {
        if (err) throw err;
        if (!user) {
            res.json({
                state: false,
                msg: "No user found"
            });
        }
        User.passwordCheck(password, user.password, function (err, match) {
            console.log(userid, password);
            if (err) {
                throw err;
            }

            if (match) {
                console.log("Userid and Password match!");
            /************************************************************************************** */
                // const cookies = res.cookie('cookieName', password, { maxAge: 9000, httpOnly: true });
                // console.log('cookie created successfully');
                /************************************************************************************** */
                const token = jwt.sign(user.toJSON(), config.secret, { expiresIn: 86400 });
                
                res.json({
                    state: true,
                    token: "JWT" + token,
                    // cookie: password,
                    user: {
                        id: user._id,
                        name: user.name,
                        userid: user.userid,
                        email: user.email,
                        usertype: user.usertype
                    }
                });
                next();
            }
            else {
                res.json({
                    state: false,
                    msg: "Password Incorrect..!"
                });
            }
        });
});
});

router.post("/register", function (req, res) {
    const newUser = new User({
        usertype: req.body.usertype,
        userid: req.body.userid,
        name: req.body.name,
        email: req.body.email,
        password: req.body.password,
        birthday: req.body.birthday,
        mobilenumber: req.body.mobilenumber,
        homenumber: req.body.homenumber,
        gender: req.body.gender,
        nationality: req.body.nationality,
        nicnumber: req.body.nicnumber,
        father: req.body.father,
        mother: req.body.mother,
        address: req.body.address,
    });
    console.log(newUser);

    User.saveUser(newUser, function (err, user) {
        if (err) {
            res.json({ state: false, msg: "Data inserting Unsuccessfull..!" });
        }
        if (user) {
            res.json({ state: true, msg: "Data inserted Successfully..!" });
        }
    });
});


router.get("/profile/:id", function (req, res) {
    User.findByUserid(req.params.id, function (err, data) {
        if (err)
            return next(err);
        res.json(data);
    });
});
module.exports = router;  
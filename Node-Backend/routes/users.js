const express = require('express');
const router = express.Router();
const User = require('../models/users');
const jwt = require('jsonwebtoken');
const config = require('../config/database');
const passport = require('passport');
const multer = require('multer');
const pdfDoc = require('pdf-lib');
const fs = require('fs');


//user login scope
router.post("/login", function (req, res, next) {
    const userid = req.body.userid;
    const password = req.body.password;

    User.findByUserid(userid, function (err, user) {
        if (err) throw err;
        if (!user) {
            res.json({
                state: false,
                msg: "No user found"
            });
            return;
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
//user registraton scope 
router.post("/register", function (req, res) {
    const newUser = new User({
        usertype: req.body.usertype,
        userid: req.body.userid,
        selectclass: req.body.selectclass,
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

//specific user profile data retrive
router.get("/profile/:id", function (req, res) {
    User.findByUserid(req.params.id, function (err, data) {
        if (err)
            return next(err);
        res.json(data);
    });
});

//get users ids names using select class name
router.get("/getStudentsNames/:cName" , function(req, res,next){
    const cName = req.params.cName;
    User.find({selectclass : cName})
        .select('userid name')
        .exec()
        .then( data=> {
            console.log("Data Transfer Success..!")
            res.status(200).json(data)
        })
        .catch(error => {
            console.log("Data Transfer Unsuccessfull..!")
            res.status(500).json({
                error : error
            })
        })
})
module.exports = router;  
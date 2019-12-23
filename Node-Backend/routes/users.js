const express = require('express');
const router = express.Router();
const User = require('../models/users');
const jwt = require('jsonwebtoken');
const config = require('../config/database');
const multer = require('multer');
const pdfDoc = require('pdf-lib');
const bcrypt = require('bcryptjs');
var path = require('path');
const fs = require('fs');

var storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'local_storage/profile_Images/')
    },
    filename: function (req, file, cb) {
        cb(null, file.originalname)
    }
});


const upload = multer({ storage: storage }).single('profileImage');

//user login scope
router.post("/login", function (req, res, next) {
    const userid = req.body.userid;
    const password = req.body.password;
    User.findByUserid(userid, function (err, user) {
        if (err) throw err;
        if (!user) {
            res.json({ state: false, msg: "No user found..!" });
            return;
        }
        User.passwordCheck(password, user.password, function (err, match) {
            console.log(userid, password);
            if (err) {
                throw err;
            }

            if (match) {
                console.log("Userid and Password match!");
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
                        usertype: user.usertype,
                        selectclass: user.selectclass
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
    upload(req, res, (err) => {
        // console.log(req.file.filename)
        var fullPath = req.file.originalname;

        var newUser = new User({
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
            filepath: fullPath,
        });

        // var newUser = new acad(document);
        console.log(newUser);
        bcrypt.genSalt(10, function (err, salt) {
            bcrypt.hash(newUser.password, salt, function (err, hash) {
                console.log(hash);
                newUser.password = hash;

                if (err) {
                    throw err;
                }
                else {
                    newUser.save()
                        .then(result => {
                            console.log(result)
                            res.json({ state: true, msg: "Data Inserted Successfully..!" });
                        })
                        .catch(error => {
                            console.log(error)
                            res.json({ state: false, msg: "Data Inserting Unsuccessfull..!" });
                        })
                }
            });
        });
    });
});

router.post("/bulkUserRegistration", function (req, res) {
        console.log("hello");
        var newUser = new User({
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
            nicnumber: req.body.NIC,
            father: req.body.father,
            mother: req.body.mother,
            address: req.body.address,
            filepath: req.body.image,
        
        });
        console.log(newUser);
        bcrypt.genSalt(10, function (err, salt) {
            bcrypt.hash(newUser.password, salt, function (err, hash) {
                console.log(hash);
                newUser.password = hash;

                if (err) {
                    throw err;
                }
                else{
                    newUser.save()
                        .then(result =>{
                            console.log(result);
                            res.json({ state: true, msg: "Data Inserted Successfully..!" });
                        })
                        .catch(error =>{
                            console.log(error);
                            res.json({ state: false, msg: "Data Inserting Unsuccessfull..!" });
                        });
                }
            });
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

//send profile image to progile.component.html
router.get("/profileImage/:filename", function (req, res) {
    const filename = req.params.filename;
    console.log(filename)
    res.sendFile(path.join(__dirname, '../local_storage/profile_Images/' + filename));
});



//get users ids names using select class name
router.get("/getStudentsNames/:cName", function (req, res, next) {
    const cName = req.params.cName;
    User.find({ selectclass: cName })
        .select('userid name')
        .exec()
        .then(data => {
            console.log("Data Transfer Success..!")
            res.json({ state: true, msg: "Data Transfer Success..!", data: data });

        })
        .catch(error => {
            console.log("Data Transfer Unsuccessfull..!")
            res.json({ state: false, msg: "Data Inserting Unsuccessfull..!" });
        })
})

/*searth user function*/

router.get("/searchUsers/:userid", function (req, res, next) {
    const userid = req.params.userid;
    User.findByUserid(userid, function (err, user) {
        if (err) throw err;
        if (!user) {
            res.json({ state: false, msg: "No user found..!" });
            return;
        }
        User.findOne({ userid: userid })
            .select()
            .exec()
            .then(data => {
                console.log("Data Transfer Success..!")
                res.json({ state: true, msg: "Data Transfer Success..!", data: data });

            })
            .catch(error => {
                console.log("Data Transfer Unsuccessfull..!")
                res.json({ state: false, msg: "Data Inserting Unsuccessfull..!" });
            })
    })
})

//update user data function

router.post("/updateUser/:userid/:imagename", function (req, res, next) {
    const userid = req.params.userid;
    const imageName = req.params.imagename;
    upload(req, res, (err) => {
        if (req.file) {
            fullPath = req.file.originalname;
            const input = {
                usertype: req.body.usertype,
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
                filepath: fullPath,
            }
            for (const [key, value] of Object.entries(input)) {
                console.log(key, value);
            }
            User.update({ userid: userid }, { $set: input })
                .exec()
                .then(data => {
                    console.log("Data Update Success..!")
                    res.json({ state: true, msg: "Data Update Success..!" });

                })
                .catch(error => {
                    console.log("Data Updating Unsuccessfull..!")
                    res.json({ state: false, msg: "Data Updating Unsuccessfull..!" });
                })
        }
        else {
            const input = {
                usertype: req.body.usertype,
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
                filepath: imageName,
            }
            for (const [key, value] of Object.entries(input)) {
                console.log(key, value);
            }
            User.update({ userid: userid }, { $set: input })
                .exec()
                .then(data => {
                    console.log("Data Update Success..!")
                    res.json({ state: true, msg: "Data Update Success..!" });

                })
                .catch(error => {
                    console.log("Data Updating Unsuccessfull..!")
                    res.json({ state: false, msg: "Data Updating Unsuccessfull..!" });
                })
        }
    })

})

//delete userdata function
router.delete("/deleteUser/:userid", function (req, res, next) {
    const userid = req.params.userid;
    User.findOneAndRemove({ userid: userid })
        .exec()
        .then(data => {
            console.log("Data Delete Success..!")
            res.json({ state: true, msg: "Data Delete Success..!" });

        })
        .catch(error => {
            console.log("Data Deleting Unsuccessfull..!")
            res.json({ state: false, msg: "Data Deleting Unsuccessfull..!" });
        })
})

//delete user profile pictuer. 
router.delete("/profImage/:filename", function (req, res) {
    const filename = req.params.filename;
    console.log(filename)
    const path = 'local_storage/profile_Images/' + filename;
    try {
        fs.unlinkSync(path)
        res.status(200).json({
            message: 'Delete the file successfully..!'
        })
        //file removed
    } catch (err) {
        console.error(err);
        res.status(500).json({
            error: error
        });
    }
});

module.exports = router;  
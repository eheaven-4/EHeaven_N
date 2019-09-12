const express = require('express');
const router = express.Router();
const User = require('../models/users');
const jwt = require('jsonwebtoken');
const config = require('../config/database');
const passport = require('passport');
const multer = require('multer');

router.get("/",function(req,res) {
    res.send("Hello users");
    console.log("hello");
})

// configuring File Upload
// const storage = multer.diskStorage({
//     // set uploads folder
//     destination: (req, file, cb) => {
//         cb(null, 'ng-src/src/assets/uploads');
//     },
//     // set default filename
//     filename: (req, file, cb) => {
//         cb(null, file.originalname); // overwrites current file with same name!!!
//     }
// });

// const upload = multer({ storage: storage })


// // Add New Media File
// router.post('/upload', upload.single('file'), (req, res, next) => {
//     console.log('post file with content:');
//     console.log(req.file);
//     // Initializing Media Info
//     let newFile = new Media({
//         filePath: 'assets\/uploads\/' + req.file.filename,
//         fileName: req.file.filename,
//         imageTitle: req.file.filename,
//         imageAlt: req.file.filename,
//         fileType: req.file.mimetype,
//         fileSize: req.file.size,
//         // imageDimension: fileDimension,
//         fileUploadDate: Date.now()
//     });
//     // Add File to DB
//     Media.addNewFile(newFile, (err, result) => {
//         if (err) {
//             res.status(500).json({ success: false, msg: 'Image Not added to DB. Error: ' + err });
//         } else {
//             res.status(200).json({ success: true, msg: 'Image Added to DB! ' + result });
//         }
//     });
// });

router.post("/register", function(req,res){
    const newUser = new User({
        usertype:req.body.usertype,
        userid:req.body.userid,
        name: req.body.name,
        email:req.body.email,
        password:req.body.password,
        birthday:req.body.birthday,
        mobilenumber:req.body.mobilenumber,
        homenumber:req.body.homenumber,
        gender:req.body.gender,
        nationality:req.body.nationality,
        nicnumber:req.body.nicnumber,
        father:req.body.father,
        mother:req.body.mother,
        address:req.body.address,
    });
    console.log(newUser);
    
    User.saveUser(newUser, function(err,user){
        if(err){
            res.json({state : false, msg: "Data inserting Unsuccessfull..!"});
        }
        if(user){
            res.json({state : true, msg: "Data inserted Successfully..!"});
        }
    });
});

router.post("/login", function(req,res){
    const userid = req.body.userid;
    const password = req.body.password;

    User.findByUserid(userid, function(err, user){
        if(err) throw err;
        if(!user){
            res.json({
                state: false, 
                msg: "No user found"
            });
        }
        User.passwordCheck(password, user.password, function(err,match){
            console.log(userid,password);
            if(err){
                throw err;
            }
            
            if(match){
                console.log("Userid and Password match!");
                const token = jwt.sign(user.toJSON(), config.secret, {expiresIn: 86400});
                res.json({
                    state: true,
                    token: "JWT"+token,
                    user: {
                        id: user._id,
                        name: user.name,
                        userid: user.userid,
                        email:user.email,
                    }
                });
            }
            else{
                res.json({
                    state: false, 
                    msg: "Password Incorrect..!"
                });
            }
        });
    });
});

router.get("/profile/:id", function(req, res) {
    User.findByUserid(req.params.id, function (err, data) {
      if (err) 
        return next(err);
      res.json(data);
    });
  });
module.exports = router;  
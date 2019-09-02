const express = require('express');
const router = express.Router();
const User = require('../models/users');
const jwt = require('jsonwebtoken');
const config = require('../config/database');
const passport = require('passport');

router.get("/",function(req,res) {
    res.send("Hello users");
    console.log("hello");
})

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

// router.get('/profile',function(req,res){
//         console.log("hello world");
//         res.json({user : req.user});
//         console.log(user);
// });
router.get('profile/:id', function(req, res, next) {
    User.findById(req.params.id, function (err, post) {
      if (err) return next(err);
      res.json(post);
    });
  });
module.exports = router;  
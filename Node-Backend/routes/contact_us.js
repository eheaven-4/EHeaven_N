const express = require('express');
const router = express.Router();
const ContactUs = require('../models/contact_us');
const config = require('../config/database');


router.post("/sendMessage", function(req,res) {

    console.log(req.body);
    
    // const newData = new ContactUs({
    //     name :  req.body.name,
    //     email : req.body.email,
    //     mobile : req.body.mobile,
    //     nic : req.body.nic,
    //     subject : req.body.subject,
    //     message : req.body.message,
    //     date : Date(),
    //     state : "pending"
    // })
    // console.log(newData);
    
    // const newMesage = new ContactUs(newData)
    // console.log(newMesage)
    // newMesage.save()
    //     .then(result => {
    //         console.log(result)
    //         res.json({ state: true, msg: "Data Inserted Successfully..!" });
    //     })
    //     .catch(error => {
    //         console.log(error)
    //         res.json({ state: false, msg: "Data Inserting Unsuccessfull..!" });
    //     })
})

module.exports = router;
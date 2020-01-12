const express = require('express');
const router = express.Router();
const payment = require('../models/payment');
const config = require('../config/database');
var path = require('path');

router.post('/add',(req,res)=>{
    
    const newPayment = new payment ({
        sName: req.body.sName,
        sId : req.body.sId,
        sClass : req.body.sClass,
        pName : req.body.pName,
        payment : req.body.payment,
    });

    newPayment.save()
    .then(result => {
        res.json({ state: true, msg: "Data Inserted Successfully..!" });
    })
    .catch(error => {
        res.json({ state: false, msg: "Data Inserting Unsuccessfull..!" });
    })
});

router.get("/view", (req, res, next) => { 
    payment.find()
        .select('sName sId sClass pName payment')
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

module.exports = router;
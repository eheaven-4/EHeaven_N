const express = require('express');
const router = express.Router();
const news = require('../models/news');
//const config = require('../config/database');

/*save date to  data on databade */
router.post("/add",(req, res)=>{
    console.log("hello");

    const newNews = new News({
        userid:req.body.userid,
        topic:req.body.topic,
        newssumery:req.body.newssumery,
        news:req.body.news,
        date:req.body.date,
        filepath:req.body.filepath

    });

    newNews
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
module.exports = router;
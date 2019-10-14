const express = require('express');
const router = express.Router();
const news = require('../models/news');
const config = require('../config/database');


router.post("/add",(req, res)=>{
    console.log("hello");

    const newNews = new News({
        

    })


});
module.exports = router;
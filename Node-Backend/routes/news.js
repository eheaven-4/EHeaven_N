const express = require('express');
const router = express.Router();
const newNews = require('../models/news');
const config = require('../config/database');
const multer = require('multer');

var storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads/')
    },
    filename: function (req, file, cb) {
        cb(null, file.originalname)
    }
});

const upload = multer({ storage: storage }).single('newsImage');

/*save date to  data on databade */
router.post("/add",(req, res)=>{

    upload(req, res, (err) => {
        
        
        var document = {
            userid:req.body.userid,
            topic:req.body.topic,
            newsSumery:req.body.newsSumery,
            news:req.body.news,
            date:req.body.date,
            filepath:req.body.filepath
        };
        console.log(document)
        var photo = new newNews(document);
        photo.save()
          .then(result => {
            console.log(result)
            res.json({ state: true, msg: "Data Inserted Successfully..!" });
          })
          .catch(error => {
            console.log(error)
            res.json({ state: false, msg: "Data Inserting Unsuccessfull..!" });
          }) 
      })
});

router.get("/view", (req, res, next) => { // news get methord
    newNews.find().sort({ date: -1 })
        .select('userid topic newsSumery news date usertype')
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

router.delete('/delete/:_id', (req, res, next) => {// news delete methord
    // console.log("Hello");
    const id = req.params._id;
    newNews.remove({ _id: id })
        .exec()
        .then(result => {
            res.status(200).json({
                message: 'Deleted Successfully'
            });
        })
        .catch(error => {
            console.log(error);
            res.status(500).json({
                error: error
            });
        });
});

router.put('/edit/:_id',(req,res,nest)=>{ // news update methord
    const id = req.params._id;
    



});

module.exports = router;
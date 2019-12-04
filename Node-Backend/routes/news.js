const express = require('express');
const router = express.Router();
const News = require('../models/news');
const config = require('../config/database');
const multer = require('multer');
var path = require('path');
const fs = require('fs');

var storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'local_storage/news_Attachment/')
    },
    filename: function (req, file, cb) {
        cb(null, "NEWS_FILE - " + file.originalname)
    }
});

const upload = multer({ storage: storage }).single('newsImage');

/*save date to  data on databade */
router.post("/add", (req, res) => {

    upload(req, res, (err) => {

        if (req.file) {
            var filePath = "NEWS_FILE - " + req.file.originalname;    //send data to the database
            //get file name 
        }
        const newNews = new News({
            userid: req.body.userid,
            topic: req.body.topic,
            newsSumery: req.body.newsSumery,
            news: req.body.news,
            date: req.body.date,
            filePath: filePath
        });

        newNews.save()
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
    News.find().sort({ date: -1 })
        .select('topic newsSumery news date filePath')
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
//Get news attchment 
router.get("/newsAttachment/:filename", function (req, res) {
    const filename = req.params.filename;
    // console.log(filename)x
    res.sendFile(path.join(__dirname, '../local_storage/news_Attachment/' + filename));
});


router.delete('/delete/:_id', (req, res, next) => {// news delete methord
    // console.log("Hello");
    const id = req.params._id;
    News.remove({ _id: id })
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

router.delete("/newsAttachment/:filename", function (req, res) {
    const filename = req.params.filename;
    console.log(filename)
    const path = 'local_storage/news_Attachment/' + filename;
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


router.get('/editnews/:id', (req, res, next) => {
    const newsid = req.params.id;
    News.findById(req.params.id, (err, news) => {
        if (err) throw err;
        if (!news) {
            res.json({ state: false, msg: 'No news found' });
            return;
        }
        News.findOne({ _id: newsid })
            .select()
            .exec()
            .then(data => {
                console.log('News Transfer Success..');
                res.json({ state: true, msg: 'News Transfer success..', data: data });
            })
            .catch(error => {
                console.log('Data Transfer Unsuccess..');
                res.json({ state: false, msg: 'News Inserting Unsuccessfull..' });
            })
    })
})


router.post('/updateNews/:_id/:newspicname', (req, res) => {  // update methord 
    const newsid = req.params._id;
    const newspicname = req.params.newspicname;

    upload(req, res, (err) => {
        if (req.file) {
            fullPath = "NEWS_FILE - " + req.file.originalname;

            const input = {
                topic: req.body.topic,
                newsSumery: req.body.newsSumery,
                news: req.body.news,
                filPath: fullPath,
                date: req.body.date,
            }

            for (const [key, value] of Object.entries(input)) {
                console.log(key, value);
            }
            News.update({ _id: newsid }, { $set: input }
                )
                .exec()
                .then(data => {
                    console.log('News update success..')
                    res.json({ state: true, msg: 'News update success..' });
                })
                .catch(error => {
                    console.log('News update unsuccessfull..')
                    res.json({ state: false, msg: 'News update unsuccess..' });
                })


        } else {

            const input = {
                topic: req.body.topic,
                newsSumery: req.body.newsSumery,
                news: req.body.news,
                filePath: newspicname,
                date: req.body.date,
            }
            for (const [key, value] of Object.entries(input)) {
                console.log(key, value);
            }
            News.update({ _id: newsid }, { $set: input })
                .exec()
                .then(data => {
                    console.log('News update success..')
                    res.json({ state: true, msg: 'News update success..' });
                })
                .catch(error => {
                    console.log('News update unsuccessfull..')
                    res.json({ state: false, msg: 'News update unsuccess..' });
                })


        }
    });

});


//get top 4 news in the DATABASE    
router.get('/topNews', function (req, res) {
    News.find()
        .sort({ date: -1 })
        .limit(4)
        .exec()
        .then(result => {
            console.log(result)
            res.json({ state: true, msg: "Data Transfer Successfully..!", data: result });
        })
        .catch(error => {
            console.log(error)
            res.json({ state: false, msg: "Data Transfering Unsuccessfull..!" });
        })
})


module.exports = router;
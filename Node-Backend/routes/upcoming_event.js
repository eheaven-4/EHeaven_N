const express = require('express');
const router = express.Router();
const Event = require('../models/upcoming_event');
const config = require('../config/database');
const path = require('path');



// save to data on database
router.post("/addevent",(req,res)=>{


    const newEvent = new Event({
        userid:req.params.userid,
        head: req.body.head,
        eventdetails: req.body.eventdetails,
        day: req.body.day
    });

    newEvent.save()
        .then(result =>{
            console.log(result)
            res.json({ state: true, msg : "Data inserted Successfully..."});

        })
        .catch(error =>{
            console.log(error)
            res.json({state: true , msg: "Data Inserting Unsuccessfull..."});
           
        });
});

// view data function
router.get("/viewevent",(req,res)=>{
    Event.find().sort({date: -1})
        .select('head eventdetails day')
        .exec()
        .then(docs =>{
            console.log("Data Transfer Success...");
            res.status(200).json(docs);
        })
        .catch(error =>{
            console.log(error);
            res.status(500).json({
                error:error
            });
        });
});

// event delete option

router.delete('/deleteevent/:_id', (req,res) => { 
   // Console.log("JDBWKSDKCJKSDJXZ")
    const id = req.params._id;
    Event.remove({_id: id})
    .exec()
    .then(result =>{
        res.json(200).json({state:true , msg: 'Deleted Successfully'
        });
    })
    .catch(error =>{
        console.log(error);
        res.status(500).json({
            error:error
        });
    });
     
});

router.get('/editevent/:id' , (req,res)=>{
    const id = req.params.id;
    Event.findById(id , (err, event)=>{
    if(err)throw err;
    if(!event){
        res.json({state:false,msg:'No event found'});
        return;
    }
    Event.findOne({_id :id})
        .select()
        .exec()
        .then(data =>{
            res.json({state: true , msg:'Event transfer success..',data:data});
        })
        .catch(error => {
            res.json({state: false, msg:'Event Inserting Unsuccessfull...'})
        });
    });
});

module.exports = router ;
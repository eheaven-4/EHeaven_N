const express = require('express');
const router = express.Router();
const  requestExtracurr = require('../models/student_extra');


/*Student request extra curricular addition */
router.post("/requestExtracurr", function (req, res) {
    const newRequest = new requestExtracurr({
        userid: req.body.userid,
        extracurrCat: req.body.extracurrCat,
        desp: req.body.desp,
        dateofMembership: req.body.dateofMembership,
        extracurrname: req.body.extracurrname,
        type: req.body.type,
        reqDate: req.body.reqDate, 
        compName: req.body.compName,
        dateofAchv: req.body.dateofAchv,
        achv: req.body.achv,
        micapprovState: req.body.micapprovState,
        state: req.body.state,
    });
    //console.log('Hello at server');
   
    requestExtracurr.addLog(newRequest,function (err,request){
        if(err){
            res.json({state:false,msg:"New record insertion failed"});
        }
        if(request){
            res.json({state:true,msg:"New record inserted"});
        }
    });
});
module.exports = router;

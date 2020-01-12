const mongoose = require('mongoose');
const Schema = mongoose.schema;

const markSchema=mongoose.Schema({
    classname:{type:String,require:true},
    year :{type:String,require:true},
    term:{type:String,require:true},
    marks:[{
        name:String,
        userid:String,
        mark:Number
    }]
});
const mark=module.exports=mongoose.model("mark",markSchema);


module.exports.addMark=function(newmark,callback){
    console.log(newmark);
    newmark.save(callback);
};
// module.exports.updateAttendance=function(datalog,callback){
//     //con
// }
// module.exports.retriveUsers(callback){
//     users.find(callback);
// }
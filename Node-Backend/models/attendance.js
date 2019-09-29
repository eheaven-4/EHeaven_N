const mongoose = require('mongoose');
const Schema = mongoose.schema;

const attendanceSchema=mongoose.Schema({
    userid :{type:String,require:true},
    attend:{type:Boolean,require:true},
    date:{type:String,require:true},
    class:{type:String,require:true}
});
const attendance=module.exports=mongoose.model("attendance",attendanceSchema);


module.exports.addAttendance=function(newattend,callback){
    console.log(newattend);
    newattend.save(callback);
}
// module.exports.retriveUsers(callback){
//     users.find(callback);
// }
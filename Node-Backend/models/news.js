const mongoose = require('mongoose');
const Schema = mongoose.Schema;



const newsSchema = mongoose.Schema({
    topic:{type:String, require:true},
    newssumery:{type:String, require:true},
    news:{type:String, require:true},
    date:{type:String, require:true},
});

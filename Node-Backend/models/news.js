const mongoose = require('mongoose');
const Schema = mongoose.Schema;



const newsSchema = mongoose.Schema({
    userid:{type:String,require:true},
    topic:{type:String, require:true},
    newssumery:{type:String, require:true},
    news:{type:String, require:true},
    date:{type:String, require:true},
    filepath:{type: String, require:true} 
});

const News = module.exports = mongoose.model("News", newsSchema);  

module.export = {


}
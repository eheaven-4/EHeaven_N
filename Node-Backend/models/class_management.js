const mongoose = require('mongoose');
const Schema = mongoose.schema;

const classTimeTableSchema = mongoose.Schema({
    className: { type: String, require: true },

    monday: [{ 
        one: {type: String, require: true},
        two: {type: String, require: true},
        three: {type: String, require: true},
        four: {type: String, require: true},
        five: {type: String, require: true},
        six: {type: String, require: true},
        seven: {type: String, require: true},
        eight: {type: String, require: true},
     }],
    tuesday: { 
        one: {type: String, require: true},
        two: {type: String, require: true},
        three: {type: String, require: true},
        four: {type: String, require: true},
        five: {type: String, require: true},
        six: {type: String, require: true},
        seven: {type: String, require: true},
        eight: {type: String, require: true},
    },
    
    wednesday: { 
        one: {type: String, require: true},
        two: {type: String, require: true},
        three: {type: String, require: true},
        four: {type: String, require: true},
        five: {type: String, require: true},
        six: {type: String, require: true},
        seven: {type: String, require: true},
        eight: {type: String, require: true},
     },
    
    thursday: { 
        one: {type: String, require: true},
        two: {type: String, require: true},
        three: {type: String, require: true},
        four: {type: String, require: true},
        five: {type: String, require: true},
        six: {type: String, require: true},
        seven: {type: String, require: true},
        eight: {type: String, require: true},
     },
    
    friday: { 
        one: {type: String, require: true},
        two: {type: String, require: true},
        three: {type: String, require: true},
        four: {type: String, require: true},
        five: {type: String, require: true},
        six: {type: String, require: true},
        seven: {type: String, require: true},
        eight: {type: String, require: true},
     }
});

const classTimeTable = module.exports = mongoose.model("classTimeTable", classTimeTableSchema);  

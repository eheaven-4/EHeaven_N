const mongoose = require('mongoose');
const Schema = mongoose.schema;

const classTimeTableSchema = mongoose.Schema({
    object: { type: String, require: true },

    // monday: { 
    //     1: {type: String, require: true},
    //     2: {type: String, require: true},
    //     // 3: {type: String, require: true},
    //     // 4: {type: String, require: true},
    //     // 5: {type: String, require: true},
    //     // 6: {type: String, require: true},
    //     // 7: {type: String, require: true},
    //     // 8: {type: String, require: true},
    //  },
    // tuesday: { 
    //     1: {type: String, require: true},
    //     // 2: {type: String, require: true},
    //     3: {type: String, require: true},
        // 4: {type: String, require: true},
        // 5: {type: String, require: true},
        // 6: {type: String, require: true},
        // 7: {type: String, require: true},
        // 8: {type: String, require: true},
    // },
    
    // wednesday: { 
    //     1: {type: String, require: true},
    //     2: {type: String, require: true},
    //     3: {type: String, require: true},
    //     4: {type: String, require: true},
    //     5: {type: String, require: true},
    //     6: {type: String, require: true},
    //     7: {type: String, require: true},
    //     8: {type: String, require: true},
    //  },
    
    // thursday: { 
    //     1: {type: String, require: true},
    //     2: {type: String, require: true},
    //     3: {type: String, require: true},
    //     4: {type: String, require: true},
    //     5: {type: String, require: true},
    //     6: {type: String, require: true},
    //     7: {type: String, require: true},
    //     8: {type: String, require: true},
    //  },
    
    // friday: { 
    //     1: {type: String, require: true},
    //     2: {type: String, require: true},
    //     3: {type: String, require: true},
    //     4: {type: String, require: true},
    //     5: {type: String, require: true},
    //     6: {type: String, require: true},
    //     7: {type: String, require: true},
    //     8: {type: String, require: true},
    //  }
});

const classTimeTable = module.exports = mongoose.model("classTimeTable", classTimeTableSchema);  


// const classTimeTableSchema = mongoose.model("classTimeTable", classTimeTableSchema);

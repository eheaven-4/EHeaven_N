const mongoose = require('mongoose');
const Schema = mongoose.schema;

var photoSchema = mongoose.Schema({
    path: { type: String },
    name: {type: String}
});

// module.exports = mongoose.model('Photos', photoSchema)
const acad = module.exports = mongoose.model("acad", photoSchema);  

const mongoose = require('mongoose');
const Schema = mongoose.schema;

/********************Student extra curricular addition requests **************************************/

const requestExtracurrSchema = mongoose.Schema({
    userid: { type: String, require: true },
    extracurrCat: { type: String, require: true },
    desp: { type: String, require: true },
    dateofMembership: { type: String, require: true },
    extracurrname: { type: String, require: true },
    type: { type: String,  require: true },
    reqDate: {type: String, require: true},
    compName: { type: String, require: true},
    dateofAchv: { type: String, require: true},
    achv: { type: String, require: true},
    micapprovState: { type: String, require: true},
    state: { type: String, require: true}
});


const requestExtracurr = mongoose.model("requestExtracurr", requestExtracurrSchema);

module.exports = {
    requestExtracurr: requestExtracurr,
}
const mongoose = require('mongoose');
const Schema = mongoose.schema;

const requestCertificationSchema = mongoose.Schema({
    userid: { type: String, require: true },
    certName: { type: String, require: true },
    certType: { type: String, require: true },
    examName: { type: String, require: true },
    examYear: { type: String, require: true },
    examIndex: { type: String, require: true },
    state: { type: String, require: true}
});

const requestCertification = module.exports = mongoose.model("requestCertification", requestCertificationSchema);

module.exports.saveRequest = function (newRequestCertification, callback) {
    newRequestCertification.save(callback);
};

const mongoose = require('mongoose');
const Schema = mongoose.schema;

const requestCertificationSchema = mongoose.Schema({
    userid: { type: String, require: true },
    certName: { type: String, require: true },
    certType: { type: String, require: true },
    examName: { type: String, require: true },
    examYear: { type: String, require: true },
    examIndex: { type: String,  require: true },
    reqDate: {type: String, require: true},
    state: { type: String, require: true}
});

const requestStudentstatusSchema = mongoose.Schema({
    studentName: { type: String, require: true },
    admissionNum: { type: String, require: true },
    dateofAdmission: { type: String, require: true },
    currentStatus: { type: String, require: true },
    description: { type: String, require: true },
    state: {type :String, require: true}
});

const requestCharacterCertSchema = mongoose.Schema({
    studentName: { type: String, require: true },
    admissionNum: { type: String, require: true },
    dateofAdmission: { type: String, require: true },
    dateofLeaving: { type: String, require: true },
    lastClass: { type: String, require: true },
    lastExam: {type :String, require: true},
    examYear: {type :String, require: true},
    academicStatus: {type :String, require: true},
    moral: {type :String, require: true},
    leadership: {type :String, require: true},
    societies: {type :String, require: true},
    sports: {type :String, require: true},
});

const requestCertification = mongoose.model("requestCertification", requestCertificationSchema);
const requestStudentstatus=  mongoose.model("requestStudentstatus", requestStudentstatusSchema);
const requestCharacterCert=  mongoose.model("requestCharacterCert", requestCharacterCertSchema);

module.exports = {
    requestCertification: requestCertification,
    requestStudentstatus: requestStudentstatus,
    requestCharacterCert: requestCharacterCert,
}
const mongoose = require('mongoose');
const Schema = mongoose.schema;

/********************Student certification requests **************************************/
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

/********************Admin Prepare certificates******************************************/
//Student Status verification certificate
const requestStudentstatusSchema = mongoose.Schema({
    studentName: { type: String, require: true },
    admissionNum: { type: String, require: true },
    dateofAdmission: { type: String, require: true },
    currentStatus: { type: String, require: true },
    description: { type: String, require: true },
    state: {type :String, require: true}
});

//character certificate
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

//leaving certificate
const requestLeavingCertSchema = mongoose.Schema({
    studentName: { type: String, require: true },
    admissionNum: { type: String, require: true },
    dateofAdmission: { type: String, require: true },
    dateofLeaving: { type: String, require: true },
    dateofBirth: { type: String, require: true },
    fathersName: {type :String, require: true},
    fathersOccupation: {type :String, require: true},
    fathersAddress: {type :String, require: true},
    religion: {type :String, require: true},
    schoolName: {type :String, require: true},
    schoolType: {type :String, require: true},
    cause: {type :String, require: true},
    lastClass: {type :String, require: true},
    subjects: {type :String, require: true},
});

const requestCertification = mongoose.model("requestCertification", requestCertificationSchema);
const requestStudentstatus=  mongoose.model("requestStudentstatus", requestStudentstatusSchema);
const requestCharacterCert=  mongoose.model("requestCharacterCert", requestCharacterCertSchema);
const requestLeavingCert=  mongoose.model("requestLeavingrCert", requestLeavingCertSchema);

module.exports = {
    requestCertification: requestCertification,
    requestStudentstatus: requestStudentstatus,
    requestCharacterCert: requestCharacterCert,
    requestLeavingCert: requestLeavingCert,
}
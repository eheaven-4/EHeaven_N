const express = require('express');
const app = express();
const path = require('path');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const passport = require('passport');
const cors = require('cors');
const multer = require('multer');
const DIR = './uploads/'
const upload = multer({ dest: DIR }).single('photo');

const config = require('./config/database');
const users = require('./routes/users');
const notification = require('./routes/notification');
const certification = require('./routes/certification');
const attendance = require('./routes/attendance');
const class_management = require('./routes/class_management');
const teacher_management = require('./routes/teacher_management');
// const filehandler=require('./routes/filehandler');
const academics = require('./routes/academics');

app.use(cors());

const connection = mongoose.connect(config.database);
if (connection) {
    console.log("Database Connected");
}
else {
    console.log("Database not Connected");
}

//create a cors middleware
app.use(function (req, res, next) {
    //set headers to allow cross origin request.
    res.header("Access-Control-Allow-Origin", "*");
    res.header('Access-Control-Allow-Methods', 'PUT, GET, POST, DELETE, OPTIONS');
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(passport.initialize());
app.use(passport.session());
require('./config/passport')(passport);

app.use(express.static(path.join(__dirname, "public")));

app.use('/users', users);
app.use('/notification', notification);
app.use('/certification', certification);
app.use('/attendance',attendance);
app.use('/class_management',class_management);
app.use('/teacher_management',teacher_management);
// app.use('/filehandler',filehandler);
app.use('/academics', academics);

app.get("/", function (req, res) {
    // res.send("Hello world");
});

app.listen(3000, function () {
    console.log("listning to port 3000");
});

module.exports = app;
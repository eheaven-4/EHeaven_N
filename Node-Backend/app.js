 const express = require('express');
const app = express();
const path = require('path');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const passport = require('passport');
const cors = require('cors');

const config = require('./config/database');
const users = require('./routes/users');
const notification = require('./routes/notification');
const certification = require('./routes/certification');
const attendance = require('./routes/attendance');
const clasroom = require('./routes/class');
const class_management = require('./routes/class_management');
const teacher_management = require('./routes/teacher_management');
const academics = require('./routes/academics');
const news = require('./routes/news');
const filehandler= require('./routes/filehandler');
const mark= require('./routes/mark');
const payment = require('./routes/payment');

app.use(cors());
// saskaojsaoijao
const connection = mongoose.connect(config.database);
if(connection){
    console.log("Database Connected");
}
else{
    console.log("Database not Connected");
}

app.use(bodyParser.urlencoded({ extended: true}));
app.use(bodyParser.json());
app.use(passport.initialize());
app.use(passport.session());
require('./config/passport')(passport);

app.use(express.static(path.join(__dirname,"public")));

app.use('/users', users);
app.use('/notification', notification);
app.use('/certification', certification);
app.use('/attendance',attendance);
app.use('/classroom',clasroom);
app.use('/class_management',class_management);
app.use('/teacher_management',teacher_management);
app.use('/academics', academics);
app.use('/news',news);
app.use('/filehandler',filehandler);
app.use('/mark',mark);
app.use('/payment', payment);

app.get("/", function(req,res) {
    // res.send("Hello world");
});

app.listen(3000, function() {
    console.log("listning to port 3000");
});

module.exports = app;
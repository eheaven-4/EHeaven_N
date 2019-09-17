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

app.use(cors());

const connection = mongoose.connect(config.database);
if(connection){
    console.log("Database Connected");
}
else{
    console.log("Database not Connected");
}

app.use(bodyParser.urlencoded({ extended: false}));
app.use(bodyParser.json());
app.use(passport.initialize());
app.use(passport.session());
require('./config/passport')(passport);

app.use(express.static(path.join(__dirname,"public")));

app.use('/users', users);
app.use('/notification', notification);

app.get("/", function(req,res) {
    // res.send("Hello world");
});

app.listen(3000, function() {
    console.log("listning to port 3000");
});

module.exports = app;
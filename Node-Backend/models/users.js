const mongoose = require('mongoose'); 
const bcrypt = require('bcryptjs');
const Schema = mongoose.schema;

const userSchema = mongoose.Schema({
    username:{type:String, require:true},
    name:{type:String, require:true},
    email:{type:String, require:true},
    password:{type:String, require:true}
});

const Users = module.exports = mongoose.model("Users", userSchema);  

module.exports.saveUser = function(newUser, callback) {
   
    bcrypt.genSalt(10, function(err, salt) {
        bcrypt.hash(newUser.password, salt, function(err, hash) {
            console.log(hash);
            newUser.password = hash;

            if(err){
                throw err;
            }
            else{
                newUser.save(callback);
            }
        });
    }); 
};

module.exports.findByEmail = function(email,callback){
    const query = {email:email};

    Users.findOne(query, callback);
};

module.exports.passwordCheck = function(plainpassword, hash,callback){
    bcrypt.compare(plainpassword, hash, function(err, res) {
       console.log(res);
       if(err) throw err;

       if(res){
           callback(null, res);
       }
    });
}

module.exports.findUserById = function(id , callback){
    Users.findOne(id,callback); 
}

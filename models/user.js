const mongoose = require('mongoose');
const schema = mongoose.Schema;
const bcrypt = require('bcryptjs');

var userSchema = new mongoose.Schema({
    password: String,
    id:String,
    email:   String,
    name:   String,
    username:  String,
    occupation: String,
    weight: Number,
    height: Number,
    bodyindex: Number,
    allergies: [String],
    city : String,
    country: String,
    healthconditions: [String],
    img: String


});

const User = module.exports = mongoose.model("User",userSchema);

module.exports.saveUser = function(newUser,callback){
    bcrypt.genSalt(10, function(err, salt) {
        bcrypt.hash(newUser.password, salt, function(err, hash) {
            newUser.password = hash;
            newUser.save(callback);
        });
    });
};

module.exports.findByEmail = function (email,callback){
    const query = {email : email};
    User.findOne(query,callback);
};

module.exports.passwordCheck = function(plainPassword,hashed,callback){
    bcrypt.compare(plainPassword, hashed, function(err, res) {
        if (err) {
            console.log(err);
        }
        if(res){
            callback(null,res);
        }
    });
};

module.exports.findUserById = function (id,callback) {
    User.findById(id,callback);
};

module.exports.updateUser = function (newUser,callback) {
    User.findById(newUser.id, function (err, user) {
        if (err) {
            res.send({error:err});
        }

        user.set(
                { occupation: newUser.occupation,
                    weight:newUser.weight,
                    email:newUser.email,
                    name:newUser.name,
                    username:newUser.username,
                    height:newUser.height,
                    bodyindex:newUser.bodyindex,
                    allergies: newUser.allergies,
                    city:newUser.city,
                    country: newUser.country,
                    healthconditions:newUser.healthconditions,
                    img:newUser.img
                }
            );
        user.save(callback);
    });
}
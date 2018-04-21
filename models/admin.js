const mongoose = require('mongoose');
const schema = mongoose.Schema;
const bcrypt = require('bcryptjs');

var adminSchema = new mongoose.Schema({
    password: String,
    id:String,
    email:   String,
    name:   String,
    username:  String,
    img: String,
    isadmin:   Boolean


});

const Admin = module.exports = mongoose.model("Admin",adminSchema);

module.exports.saveAdmin = function(newAdmin,callback){
    bcrypt.genSalt(10, function(err, salt) {
        bcrypt.hash(newAdmin.password, salt, function(err, hash) {
            newAdmin.password = hash;
            newAdmin.save(callback);
        });
    });
};

module.exports.findByEmail = function (email,callback){
    const query = {email : email};
    Admin.findOne(query,callback);
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

module.exports.findAdminById = function (id,callback) {
    Admin.findById(id,callback);
};

module.exports.updateAdmin = function (newAdmin,callback) {
    Admin.findById(newAdmin.id, function (err, admin) {
        if (err) {
            res.send({error:err});
        }

        admin.set(
            {   email:newAdmin.email,
                name:newAdmin.name,
                username:newAdmin.username,
                img:newAdmin.img
            }
        );
        admin.save(callback);
    });
};
const express = require('express');
const router = express.Router();
const User  = require('../models/user');
const jwt = require('jsonwebtoken');
const dbConfig = require('../config/database');
const passport = require('passport');


router.post("/login",function(req,res ){
    const email = req.body.email;
    const password = req.body.password;
    var token;
    var tokenObj;
    console.log("login request recieved");

    User.findByEmail(email, function(err,user){
        if (err){
            res.json({state:false,msg:"error occurred"});
            console.log(err);
        }if(!user){
            res.json({state:false,msg:"User not found"});
            console.log("User not found");
        }
        console.log("user found");
        console.log(user);
        User.passwordCheck(password, user.password, function(err, isMatch){
            if(err) {
                console.log(err);
            }if(isMatch){
                console.log('password matched');
                token = jwt.sign(user.toObject(), dbConfig.secret,{
                    expiresIn:604800  //one week
                });
                res.json(
                    {
                        state:true,
                        msg:"password and email matched, token created",
                        token:"JWT " + token,
                        userData: {
                            id:user._id,
                            name:user.name,
                            username:user.username,
                            email:user.email
                        }
                    }
                )
            }else {
                console.log("password miss matched")
                res.json({state:false, msg:"wrong password "})
            }
        })
    });
});

router.post("/register",function(req,res ){
    const newUser = new User({
        username : req.body.username,
        name : req.body.name,
        email : req.body.email,
        password: req.body.password
    });
    console.log('register call recieved');

    User.saveUser(newUser, function(err,user){
        if(err){
            res.json({state:false,msg:"data not inserted"});
        }
        if(user){
            res.json({state:true,msg:"data inserted"});
        }
    });

});

/*router.post('/profile', passport.authenticate('jwt', { session: false }), function(req, res, next) {
        console.log("/profile request received");
        console.log(req);
        res.json({user:req.user});
    }
);*/

router.post('/profile', passport.authenticate('jwt', {session: false}), function(req, res, next){
    console.log("/profile request received");
    if (req.user){
        res.json({state:true,user: req.user});
    }else if (!req.user){
        res.json({state: false})
    }
    //res.json({user: req.user});
});
router.post("/update",function(req,res ){
    const newUser = new User({
        id:req.body._id,
        occupation: req.body.occupation,
        weight:req.body.weight,
        email:req.body.email,
        name:req.body.name,
        username:req.body.username,
        height:req.body.height,
        bodyindex:req.body.weight/(req.body.height*req.body.height),
        allergies: req.body.allergies,
        city:req.body.city,
        country: req.body.country,
        healthconditions:req.body.healthconditions,
        img:req.body.img

    });
    console.log("update call recieved");
    User.updateUser(newUser, function(err,user){
        if(err){
            res.json({state:false,msg:"data not inserted"});
        }
        if(user){
            res.json({state:true,msg:"data inserted"});
        }
    });
});



module.exports  = router;
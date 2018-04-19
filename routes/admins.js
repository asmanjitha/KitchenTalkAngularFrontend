const express = require('express');
const router = express.Router();
const Admin  = require('../models/admin');
const jwt = require('jsonwebtoken');
const dbConfig = require('../config/database');
const passport = require('passport');



router.post('/dashboard', function(req, res, next){
    console.log("/dashboard request received");
    res.json({state: true});
});

router.post("/login",function(req,res ){
    const email = req.body.email;
    const password = req.body.password;
    var token;
    var tokenObj;
    console.log("login request recieved");

    Admin.findByEmail(email, function(err,admin){
        if (err){
            res.json({state:false,msg:"error occurred"});
            console.log(err);
        }if(!admin){
            res.json({state:false,msg:"Admin not found"});
            console.log("Admin not found");
        }
        console.log("Admin found");
        Admin.passwordCheck(password, admin.password, function(err, isMatch){
            if(err) {
                console.log(err);
            }if(isMatch){
                console.log('password matched');
                token = jwt.sign(admin.toObject(), dbConfig.secret,{
                    expiresIn:604800  //one week
                });
                res.json(
                    {
                        state:true,
                        msg:"password and email matched, token created",
                        token:"JWT " + token,
                        adminData: {
                            id:admin._id,
                            name:admin.name,
                            username:admin.username,
                            email:admin.email
                        }
                    }
                )
            }else {
                console.log("password miss matched");
                res.json({state:false, msg:"wrong password "})
            }
        })
    });
});

router.post("/register",function(req,res ){
    const newAdmin = new Admin({
        username : req.body.username,
        name : req.body.name,
        email : req.body.email,
        password: req.body.password
    });
    console.log('register call recieved');

    Admin.saveAdmin(newAdmin, function(err,admin){
        if(err){
            res.json({state:false,msg:"data not inserted"});
        }
        if(admin){
            res.json({state:true,msg:"data inserted"});
        }
    });

});


router.post('/profile', passport.authenticate('jwt', {session: false}), function(req, res, next){
    console.log("/profile admin request received");
    if (req.admin){
        res.json({state:true,admin: req.admin});
    }else if (!req.admin){
        res.json({state: false})
    }
    //res.json({user: req.user});
});
router.post("/update",function(req,res ){
    const newAdmin = new Admin({
        id:req.body._id,
        email:req.body.email,
        name:req.body.name,
        username:req.body.username,
        img:req.body.img

    });
    console.log("update call recieved");
    Admin.updateAdmin(newAdmin, function(err,admin){
        if(err){
            res.json({state:false,msg:"data not inserted"});
        }
        if(admin){
            res.json({state:true,msg:"data inserted"});
        }
    });
});

module.exports  = router;
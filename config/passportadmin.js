

const JwtStrategy = require('passport-jwt').Strategy,
    ExtractJwt = require('passport-jwt').ExtractJwt;
const dbConfig = require('./database');
const Admin = require('../models/admin')
const User = require('../models/user');





module.exports = function (passport) {
    var opts = {};
    opts.jwtFromRequest = ExtractJwt.fromAuthHeaderWithScheme('JWT');
    opts.secretOrKey = dbConfig.secret;
    passport.use(new JwtStrategy(opts, function(jwt_payload, done) {
        if(jwt_payload.isadmin == true){
            Admin.findAdminById( jwt_payload._id, function(err, user) {
                if (err) {
                    return done(err, false);
                }
                if (user) {
                    return done(null, user);
                } else {
                    return done(null, false);
                    // or you could create a new accoun
                }
            });
        }else{
            User.findUserById( jwt_payload._id, function(err, user) {
                if (err) {
                    return done(err, false);
                }
                if (user) {
                    return done(null, user);
                } else {
                    return done(null, false);
                    // or you could create a new accoun
                }
            });
        }

    }));
};

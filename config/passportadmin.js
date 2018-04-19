

const JwtStrategy = require('passport-jwt').Strategy,
    ExtractJwt = require('passport-jwt').ExtractJwt;
const dbConfig = require('./database');
const Admin = require('../models/admin');





module.exports = function (passportadmin) {
    var opts = {};
    opts.jwtFromRequest = ExtractJwt.fromAuthHeaderWithScheme('JWT');
    opts.secretOrKey = dbConfig.secret;
    passportadmin.use(new JwtStrategy(opts, function(jwt_payload, done) {
        console.log(jwt_payload);
        Admin.findAdminById( jwt_payload._id, function(err, admin) {
            if (err) {
                return done(err, false);
            }
            if (admin) {
                return done(null, admin);
            } else {
                return done(null, false);
                // or you could create a new account
            }
        });
    }));
};

const express = require('express');
const app = express();
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const path = require('path');
const port  = process.env.PORT || 3000;
const passport = require('passport');
const cors = require('cors');



app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(passport.initialize());
app.use(passport.session());
app.use(cors());
//require('./config/passport')(passport);
require('./config/passportadmin')(passport);


const config = require("./config/database");

const user  = require("./routes/users");
const recipe = require("./routes/recipes");
const admin = require("./routes/admins");
const temprecipe = require("./routes/temprecipes");

const connection = mongoose.connect(config.database);
if (connection){
    console.log("database connected");
}else{
    console.log("database not connected");
}



app.use(express.static(path.join(__dirname,"public")));
app.use('/user',user);
app.use('/recipe',recipe);
app.use('/admin',admin);
app.use('/temprecipe',temprecipe);




app.listen(port,function(){
    console.log("listening to port "+port);

});
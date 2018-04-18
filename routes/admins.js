const express = require('express');
const router = express.Router();

const dbConfig = require('../config/database');


router.post('/dashboard', function(req, res, next){
    console.log("/dashboard request received");
    res.json({state: true});
});


module.exports  = router;
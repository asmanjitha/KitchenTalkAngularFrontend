const express = require('express');
const router = express.Router();
const TempRecipe  = require('../models/temprecipe');
const Recipe = require('../models/recipe');

router.post("/saverecipe",function(req,res ){
    const newTempRecipe = new TempRecipe({
        name:req.body.name,
        ingredients:req.body.ingredients,
        rating: req.body.rating,
        comments:new Object(),
        description:req.body.description,
        health: req.body.health,
        occasion:req.body.occasion,
        img:req.body.img,
        method:req.body.method,
        author:req.body.author
    });
    console.log('save temp recipe call received');

    TempRecipe.saveRecipe(newTempRecipe, function(err,recipe){
        if(err){
            res.json({state:false,msg:"data not inserted"});
        }
        if(recipe){
            res.json({state:true,msg:"data inserted"});
        }
    });

});

router.post("/delete", function(req,res){
    TempRecipe.deleteRecipe(req.body, function(err){
        if(err){
            res.json({state:false,msg:"data not deleted"});
        }
        if(!err){
            res.json({state:true,msg:"data deleted"});
        }
    });
});

router.post("/searchall",function (req,res){
    console.log("search all temp call received ");
    TempRecipe.getAll(function(err,recipe){
        if(err){
            res.json({state:false,msg:"data not found",error : err});
        }
        if(recipe){
            res.json({state:true,msg:"data found",recipe:recipe});
        }
    });
});

router.post("/id",function(req,res){
    console.log("search by temp id call received, id :" + req.body.id);
    TempRecipe.recipeById(req.body.id, function(err,recipe){
        if(err){
            res.json({state:false,msg:"data not found",error : err});
        }
        if(recipe){
            res.json({state:true,msg:"data found",recipe:recipe});
        }
    });
});


module.exports  = router;
const express = require('express');
const router = express.Router();
const Recipe  = require('../models/recipe');
const jwt = require('jsonwebtoken');
const dbConfig = require('../config/database');
const passport = require('passport');


router.post("/saverecipe",function(req,res ){
    const newRecipe = new Recipe({
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
    console.log('save recipe call received');

    Recipe.saveRecipe(newRecipe, function(err,recipe){
        if(err){
            res.json({state:false,msg:"data not inserted"});
        }
        if(recipe){
            res.json({state:true,msg:"data inserted"});
        }
    });

});

router.post("/ingredients",function (req,res){
    console.log("search by ingredients call received ");
    Recipe.recipeByIngredients(req.body.ingredients, function(err,recipe){
        if(err){
            res.json({state:false,msg:"data not found",error : err});
        }
        if(recipe){
            res.json({state:true,msg:"data found",recipe:recipe});
        }
    });
});

router.post("/health",function (req,res){
    console.log("search by health conditions call received ");
    Recipe.recipeByHealth(req.body.health, function(err,recipe){
        if(err){
            res.json({state:false,msg:"data not found",error : err});
        }
        if(recipe){
            res.json({state:true,msg:"data found",recipe:recipe});
        }
    });
});

router.post("/occasion",function (req,res){
    console.log("search by occasion call received ");
    Recipe.recipeByOccasion(req.body.occasion, function(err,recipe){
        if(err){
            res.json({state:false,msg:"data not found",error : err});
        }
        if(recipe){
            res.json({state:true,msg:"data found",recipe:recipe});
        }
    });
});

router.post("/id",function(req,res){
    console.log("search by id call received, id :" + req.body.id);
    Recipe.recipeById(req.body.id, function(err,recipe){
        if(err){
            res.json({state:false,msg:"data not found",error : err});
        }
        if(recipe){
            res.json({state:true,msg:"data found",recipe:recipe});
        }
    });
});

router.post("/author",function (req,res){
    console.log("search by author call received ");
    Recipe.recipeByAuthor(req.body.author, function(err,recipe){
        if(err){
            res.json({state:false,msg:"data not found",error : err});
        }
        if(recipe){
            res.json({state:true,msg:"data found",recipe:recipe});
        }
    });
});

router.post ("/savecomment", function(req,res){
    const data = {
        id:req.body._id,
        comments:req.body.comments
    };
    console.log("/savecomment call received");
    Recipe.saveComment(data, function(err,recipe){
        if(err){
            res.json({state:false,msg:"data not inserted"});
        }
        if(recipe){
            res.json({state:true,msg:"data inserted"});
        }
    });
});

router.post ("/saverate", function(req,res){
    const data = {
        id:req.body._id,
        rating:req.body.rating
    };
    console.log("/saverate call received");
    Recipe.saveRate(data, function(err,recipe){
        if(err){
            res.json({state:false,msg:"data not inserted"});
        }
        if(recipe){
            res.json({state:true,msg:"data inserted"});
        }
    });
});

router.post("/update",function(req,res ){
    const newRecipe = new Recipe({
        name:req.body.name,
        ingredients:req.body.ingredients,
        rating: req.body.rating,
        comments:req.body.comments,
        description:req.body.description,
        health: req.body.health,
        occasion:req.body.occasion,
        img:req.body.img,
        method:req.body.method,
        author:req.body.author,
        _id:req.body._id

    });
    console.log("update call recieved");
    Recipe.updateRecipe(newRecipe, function(err,recipe){
        if(err){
            res.json({state:false,msg:"data not inserted"});
        }
        if(recipe){
            res.json({state:true,msg:"data inserted"});
        }
    });
});




module.exports  = router;
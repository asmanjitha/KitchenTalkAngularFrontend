
const mongoose = require('mongoose');


var recipeSchema = mongoose.Schema({
    name:String,
    ingredients:[String],
    rating: Number,
    comments:Object,
    description:String,
    health: [String],
    occasion:[String],
    method: String,
    img: String,
    author: String

});

const Recipe = module.exports = mongoose.model('foodrecipe',recipeSchema);

module.exports.saveRecipe = function(newRecipe,callback){
    console.log(newRecipe);
    newRecipe.save(callback);
};

module.exports.recipeByIngredients = function(ingredients,callback){
    const query = {ingredients:{$all : ingredients}};
    console.log(ingredients);
    Recipe.find(query,callback);

};
module.exports.recipeByHealth = function(health,callback){
    const query = {health:{$in : health}};
    console.log(health);
    Recipe.find(query,callback);

};

module.exports.recipeByOccasion = function(occasion,callback){
    const query = {occasion:{$in : occasion}};
    console.log(occasion);
    Recipe.find(query,callback);

};

module.exports.recipeByAuthor = function(author,callback){
    const query = {author:{$in : author}};
    console.log(author);
    Recipe.find(query,callback);

};

module.exports.recipeById = function (id,callback){
    const query = {_id : id};
    Recipe.findOne(query,callback);
};

module.exports.saveComment = function (data,callback){
    Recipe.findById(data.id, function (err, recipe) {
        if (err) {
            res.send({error: err});
        }

        recipe.set(
            {
                comments: data.comments
            }
        );
        recipe.save(callback);
    });
};

module.exports.updateRecipe = function (newRecipe,callback) {
    Recipe.findById(newRecipe._id, function (err, recipe) {
        if (err) {
            res.send({error:err});
        }
        console.log(recipe);
        recipe.set(
            { name:newRecipe.name,
                ingredients:newRecipe.ingredients,
                rating: newRecipe.rating,
                comments:newRecipe.comments,
                description:newRecipe.description,
                health: newRecipe.health,
                occasion:newRecipe.occasion,
                img:newRecipe.img,
                method:newRecipe.method,
                author:newRecipe.author,
                id:newRecipe._id
            }
        );
        recipe.save(callback);
    });
};

const mongoose = require('mongoose');


var temprecipeSchema = mongoose.Schema({
    name:String,
    ingredients:[String],
    rating: Number,
    count:Number,
    comments:Object,
    description:String,
    health: [String],
    occasion:[String],
    method: String,
    img: String,
    author: String,
    date: String
});

const TempRecipe = module.exports = mongoose.model('tempfoodrecipe',temprecipeSchema);

module.exports.saveRecipe = function(newRecipe,callback){
    console.log(newRecipe);
    newRecipe.save(callback);
};

module.exports.deleteRecipe = function(recipe,callback){
    console.log(recipe);
    TempRecipe.remove({_id:recipe._id}, callback,function (err) {
        if (err) {
            console.log("temp recipe deleting error")
        }if (!err){
            console.log("data deleted")
        }
    });
};

module.exports.getAll = function(callback){
    TempRecipe.find(callback);
};

module.exports.recipeById = function (id,callback){
    const query = {_id : id};
    TempRecipe.findOne(query,callback);
};
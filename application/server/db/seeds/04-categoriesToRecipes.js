
exports.seed = function(knex) {
  
    return knex("categoriesToRecipe").insert([
      {recipeID:"1", categoryID:"2"},
      {recipeID:"1", categoryID:"17"},
      {recipeID:"1", categoryID:"21"},
      {recipeID:"2", categoryID:"2"},
      {recipeID:"2", categoryID:"13"},
      {recipeID:"2", categoryID:"21"}
    ])
};
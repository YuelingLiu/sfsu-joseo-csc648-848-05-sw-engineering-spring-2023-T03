const router = require("express").Router();
const { Upload } = require("@aws-sdk/lib-storage"),
  { S3 } = require("@aws-sdk/client-s3");
const { v4: uuidv4 } = require("uuid");
const Recipe = require('../models/Recipe');


router.get('/:id', async (req, res) => {
  try{
    const recipeID = req.params.id
    const recipe = await Recipe.getById(recipeID);
    res.status(200).json(recipe);
  } catch (err){
    console.log(err);
  }
})

router.post('/', async (req, res) =>{
    console.log("recipe", req.body.recipe);
    console.log("ingredients", req.body.ingredients);
    console.log("instructions", req.body.instructions);
    try{
      const recipe = await Recipe.create(req.body.recipe, req.body.ingredients, req.body.instructions);
      res.status(201).json(recipe);
    } catch(err){
      console.log(err)
    }
  })
  
  module.exports = router;
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
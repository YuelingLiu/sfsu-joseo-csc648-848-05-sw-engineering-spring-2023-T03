const router = require("express").Router();
const { Upload } = require("@aws-sdk/lib-storage"),
  { S3 } = require("@aws-sdk/client-s3");
const { v4: uuidv4 } = require("uuid");
const Recipe = require('../models/Recipe');
const Comment = require('../models/Comment');


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

  router.delete('/:id', async (req, res) =>{
    try{
      const deleted = await Recipe.delete(req.params.id);
      res.status(200).json({deleted});
    } catch(err){
      console.log(err);
    }
  })  

  router.post('/comments/:commentID/like', async (req, res) => {
    try{
      console.log(req.body);
      const commentLike = await Comment.likeComment(req.body.userID,req.params.commentID,req.body.like);
      res.status(201).json(commentLike);
    } catch(err){
      console.log(err);
    }
  })
  
  router.post('/:id/rating', async (req,res) =>{
    try{
      const rating = await Recipe.rate(req.body.userID, req.params.id, req.body.rating);
      res.status(201).json(rating);
    } catch(err){
      console.log(err)
    }
  })
  
  module.exports = router;
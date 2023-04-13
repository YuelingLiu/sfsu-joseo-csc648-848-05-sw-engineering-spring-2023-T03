const router = require("express").Router();
const { client } = require("../db/db"); 
const User = require("../models/User");

router.get('/followers', async (req, res) => {
    const userID = req.query.id
    if (!userID) {
        res.status(400).json({ error: 'Missing user ID.' });
        return;
      }

    User.getFollowers(userID)
      .then( users =>{
        res.status(200).json({users});
      })
      .catch(err => {
        res.status(500).json({err});
      })
});

router.get('/following', async (req, res) => {
  const userID = req.query.id
  if (!userID) {
      res.status(400).json({ error: 'Missing user ID.' });
      return;
    }

  User.getFollowing(userID)
    .then( users =>{
      res.status(200).json({users});
    })
    .catch(err => {
      res.status(500).json({err});
    })
});

module.exports = router;
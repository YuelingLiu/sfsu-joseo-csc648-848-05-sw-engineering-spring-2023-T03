const router = require("express").Router();
const Recipe = require('../models/Recipe');

// search 
router.get('/', async (req, res) => {
  try {
    const query = req.query.query;
    const results = await Recipe.search(query);
    res.json(results);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'An error occurred while searching.' });
  }
});

module.exports = router;



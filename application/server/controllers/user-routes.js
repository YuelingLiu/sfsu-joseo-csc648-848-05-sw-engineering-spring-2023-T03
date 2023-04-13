const router = require("express").Router();
const { client } = require("../db/db"); 
const { user } = require("../models/User");

router.get('/followers', async (req, res) => {
    const userID = req.query.id
    if (!userID) {
        res.status(400).json({ error: 'Missing user ID.' });
        return;
      }

      
});

module.exports = router;
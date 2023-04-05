const router = require("express").Router();
const Recipe = require('../models/Recipe');

// search 
router.get('/', async (req, res) => {
  try {
    const searchTerm = req.query.query; // Assuming the search term is passed as a query parameter

    const searchQuery = `
    WITH search_result AS (
      SELECT DISTINCT r."ID" AS recipe_id
      FROM public.recipes r
      JOIN public.users u ON r."userID" = u."ID"
      JOIN public.categories_to_recipe ctr ON r."ID" = ctr."ID"
      JOIN public.categories c ON ctr."ID" = c."ID"
      JOIN public.comments cm ON r."ID" = cm."ID"
      JOIN public.ingredients i ON r."ID" = i."ID"
      JOIN public.instructions ins ON r."ID" = ins."ID"
      JOIN public.ratings rt ON r."ID" = rt."ID"
      WHERE (r.title ILIKE '%biscuits%' 
          OR r.description ILIKE '%biscuits%' 
          OR c.category ILIKE '%biscuits%' 
          OR u.username ILIKE '%biscuits%' 
          OR cm.comment ILIKE '%biscuits%' 
          OR i.ingredient ILIKE '%biscuits%' 
          OR ins.instruction ILIKE '%biscuits%')
  )
  SELECT * FROM search_result
  ORDER BY recipe_id ASC;
    `;

    const results = await db.any(searchQuery, [`%${searchTerm}%`]);
    res.json(results);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'An error occurred while searching.' });
  }
});

module.exports = router;



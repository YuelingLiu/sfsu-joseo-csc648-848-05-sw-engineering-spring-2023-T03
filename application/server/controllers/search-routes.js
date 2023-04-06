const router = require("express").Router();

// search 
router.get('/', async (req, res) => {
  try {
    const searchTerm = req.query.query; 
    const searchQuery = `
      WITH search_result AS (
        SELECT DISTINCT r."ID" AS recipe_id, r."title" AS recipe_title
        FROM public.recipes r
        JOIN public.users u ON r."userID" = u."ID"
        LEFT JOIN public.categories_to_recipe ctr ON r."ID" = ctr."recipeID"
        LEFT JOIN public.categories c ON ctr."categoryID" = c."ID"
        LEFT JOIN public.comments cm ON r."ID" = cm."recipeID"
        LEFT JOIN public.ingredients i ON r."ID" = i."recipeID"
        LEFT JOIN public.instructions ins ON r."ID" = ins."recipeID"
        LEFT JOIN public.ratings rt ON r."ID" = rt."recipeID"
        WHERE (
            r.title ILIKE '%${searchTerm}%' 
            OR r.description ILIKE '%${searchTerm}%' 
            OR c.category ILIKE '%${searchTerm}%' 
            OR u.username ILIKE '%${searchTerm}%' 
            OR cm.comment ILIKE '%${searchTerm}%' 
            OR i.ingredient ILIKE '%${searchTerm}%' 
            OR ins.instruction ILIKE '%${searchTerm}%'
        )
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



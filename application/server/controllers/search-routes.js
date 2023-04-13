const router = require("express").Router();
const { client } = require("../db/db"); 

router.get('/', async (req, res) => {
  try {
    const searchTerm = req.query.query; 

    if (!searchTerm) {
      res.status(400).json({ error: 'Missing search query.' });
      return;
    }

    const searchQuery = `
      WITH search_result AS (
        SELECT DISTINCT r."id" AS recipe_id, r."title" AS recipe_title
        FROM public.recipes r
        JOIN public.users u ON r."user_id" = u."id"
        LEFT JOIN public.categories_to_recipe ctr ON r."id" = ctr."recipe_id"
        LEFT JOIN public.categories c ON ctr."category_id" = c."id"
        LEFT JOIN public.comments cm ON r."id" = cm."recipe_id"
        LEFT JOIN public.ingredients i ON r."id" = i."recipe_id"
        LEFT JOIN public.instructions ins ON r."id" = ins."recipe_id"
        LEFT JOIN public.ratings rt ON r."id" = rt."recipe_id"
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
    const { rows } = await client.query(searchQuery);
    res.json(rows);
  } catch (err) {
    console.log('error in search-routes: ' + err.message);
    console.error(err);
    res.status(500).json({ error: 'An error occurred while searching.' });
  }
});

module.exports = router;



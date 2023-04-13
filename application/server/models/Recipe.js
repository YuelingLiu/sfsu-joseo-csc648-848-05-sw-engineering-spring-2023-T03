// models/Recipe.js

const knex = require('knex')(require('../knexfile').development);
const { client } = require("../db/db"); 

class Recipe {
  static async create(data) {
    return await knex('recipes').insert(data).returning('*');
  }

  static async getById(id) {
    return await knex('recipes').where({ id }).first();
  }

  static async getAll() {
    return await knex('recipes').select('*');
  }

  static async update(id, data) {
    return await knex('recipes').where({ id }).update(data).returning('*');
  }

  static async delete(id) {
    return await knex('recipes').where({ id }).delete();
  }

  static async search(query) {
    // return await knex('recipes')
    // .join('categoriesToRecipe','categoriesToRecipe.recipeID', 'recipes.ID')
    // .join('categories', 'categories.ID', 'categoriesToRecipe.categoryID')
    // .where('category', 'like', `%${query}%`)
    // .orWhere('title', 'like', `%${query}%`);
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
          r.title ILIKE '%${query}%' 
          OR r.description ILIKE '%${query}%' 
          OR c.category ILIKE '%${query}%' 
          OR u.username ILIKE '%${query}%' 
          OR cm.comment ILIKE '%${query}%' 
          OR i.ingredient ILIKE '%${query}%' 
          OR ins.instruction ILIKE '%${query}%'
      )
    )
    SELECT * FROM search_result
    ORDER BY recipe_id ASC;
`;
    const { rows } = await client.query(searchQuery);
    return rows;
  }
}

module.exports = Recipe;


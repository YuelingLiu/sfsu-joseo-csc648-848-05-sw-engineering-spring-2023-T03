// models/Recipe.js

const knex = require('knex')(require('../knexfile').development);

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
    return await knex('recipes')
    // .where("title", query);
    .where('title', 'ilike', `%${query}%`)
    .orWhere('category', 'ilike', `%${query}%`);
  }
}

module.exports = Recipe;


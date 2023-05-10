const knex = require('knex')(require('../knexfile').development);

class Comment {
  static async create(data) {
    return await knex('comments').insert(data).returning('*');
  }

  static async getById(id) {
    return await knex('comments').where({ id }).first();
  }

  static async getAll() {
    return await knex('comments').select('*');
  }

  static async getByUserId(user_id) {
    return await knex('comments').where({ user_id }).select('*');
  }

  static async update(id, data) {
    return await knex('comments').where({ id }).update(data).returning('*');
  }

  static async delete(id) {
    return await knex('comments').where({ id }).delete();
  }

  static async getCommentsForRecipe(recipe_id) {
    return await knex('comments')
      .join('users', 'comments.user_id', 'users.id')
      .where({ 'comments.recipe_id': recipe_id })
      .select('comments.id', 'comments.comment', 'comments.recipe_id', 'users.id as user_id', 'users.username');
  }

}

module.exports = Comment;

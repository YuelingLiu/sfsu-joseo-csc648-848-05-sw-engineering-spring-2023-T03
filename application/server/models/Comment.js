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

  static async getCommentsForPost(post_id) {
    return await knex('comments')
      .join('users', 'comments.user_id', 'users.id')
      .where({ post_id })
      .select('comments.*', 'users.username as user_name');
  }
}

module.exports = Comment;

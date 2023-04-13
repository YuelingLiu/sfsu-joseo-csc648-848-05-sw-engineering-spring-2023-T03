// models/Users.js

const knex = require('knex')(require('../knexfile').development);

class User {
  static async create(data) {
    return await knex('users').insert(data).returning('*');
  }

  static async getById(id) {
    return await knex('users').where({ id }).first();
  }

  static async getAll() {
    return await knex('user').select('*');
  }

  static async update(id, data) {
    return await knex('users').where({ id }).update(data).returning('*');
  }

  static async delete(id) {
    return await knex('users').where({ id }).delete();
  }

  static async getFollowers(user_id) {
    return await knex('followers').where({user_id});
  }

  static async getFollowing(user_id) {
    return await knex('following').where({user_id});
  }
}

module.exports = User;

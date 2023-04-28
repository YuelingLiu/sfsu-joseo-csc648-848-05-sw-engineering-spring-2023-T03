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

  static async getByEmail(email) {
    return await knex('users').where({ email }).first();
  }
  
  static async update(id, data) {
    return await knex('users').where({ id }).update(data).returning('*');
  }

  static async delete(id) {
    return await knex('users').where({ id }).delete();
  }

  static async getFollowers(user_id) {
    return await knex('followers')
    .join('users', 'followers.follower_id', 'users.id')
    .where({user_id});
  }

  static async getFollowing(user_id) {
    return await knex('following')
    .join('users', 'following.following_id', 'users.id')
    .where({user_id});
  }
}

module.exports = User;

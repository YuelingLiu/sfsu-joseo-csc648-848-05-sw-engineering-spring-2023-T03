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

  static async follow(userID, followID) {
    return (
      await knex('following')
        .insert({ user_id: userID, following_id: followID })
        .returning('*')
    )[0];
  }

  static async unfollow(userID, followID) {
    return await knex('following')
      .where('user_id', userID)
      .where('following_id', followID)
      .delete();
  }

  static async getFollowers(userID) {
    return await knex('following')
      .select('users.id', 'users.username')
      .join('users', 'following.user_id', 'users.id')
      .where('following_id', userID);
  }

  static async getFollowing(userID) {
    return await knex('following')
      .select('users.id', 'users.username')
      .join('users', 'following.following_id', 'users.id')
      .where('user_id', userID);
  }

  static async saveRecipe(userID, recipeID) {
    return (
      await knex('user_favorite_recipes')
        .insert({ user_id: userID, recipe_id: recipeID })
        .returning('*')
    )[0];
  }

  static async getSavedRecipes(userID) {
    return await knex('user_favorite_recipes')
      // .join('recipes', 'user_favorite_recipes.recipe_id', 'recipes.id')
      .where('user_favorite_recipes.user_id', userID);
  }

  static async getByUsername(username) {
    return await knex('users').where({ username }).first();
  }
}

module.exports = User;

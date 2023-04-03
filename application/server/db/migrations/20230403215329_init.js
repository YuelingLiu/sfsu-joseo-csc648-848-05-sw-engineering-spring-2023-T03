/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
    return knex.schema.createTable('users', (table) => {
        table.increments('ID').primary();
        table.string('username').notNullable();
        table.string('email').notNullable();
        table.text('password').notNullable();
      })
      .createTable('recipes', (table) => {
      table.increments('ID').primary();
      table.integer('userID').unsigned().notNullable();
      table.foreign('userID').references('ID').inTable('users');
      table.string('title').notNullable();
      table.text('description');
      table.timestamp('createdAt').defaultTo(knex.fn.now()).notNullable();
      table.integer('cookingTime').notNullable();
      table.integer('difficulty').checkBetween([1, 5]).notNullable();
    })
    .createTable('ingredients', (table) => {
      table.increments('ID').primary();
      table.integer('recipeID').unsigned().notNullable();
      table.foreign('recipeID').references('recipes.ID');
      table.string('amount').notNullable();
      table.string('ingredient').notNullable();
    })
    .createTable('instructions', (table) => {
      table.increments('ID').primary();
      table.integer('recipeID').unsigned().notNullable();
      table.foreign('recipeID').references('recipes.ID');
      table.integer('number').notNullable();
      table.text('instruction').notNullable();
    })
    .createTable('ratings', (table) => {
      table.increments('ID').primary();
      table.integer('recipeID').unsigned().notNullable();
      table.foreign('recipeID').references('recipes.ID');
      table.integer('rating').checkBetween([1, 5]).notNullable();
    })
    .createTable('categories', (table) => {
      table.increments('ID').primary();
      table.string('category').notNullable();
    })
    .createTable('categoriesToRecipe', (table) => {
      table.increments('ID').primary();
      table.integer('recipeID').unsigned().notNullable();
      table.foreign('recipeID').references('recipes.ID');
      table.integer('categoryID').unsigned().notNullable();
      table.foreign('categoryID').references('categories.ID');
    })
    .createTable('comments', (table) => {
      table.increments('ID').primary();
      table.integer('recipeID').unsigned().notNullable();
      table.foreign('recipeID').references('recipes.ID');
      table.text('comment').notNullable();
    })
  };
  
  /**
   * @param { import("knex").Knex } knex
   * @returns { Promise<void> }
   */
  exports.down = function(knex) {
    return (knex.schema
        .dropTableIfExists('comments')
      .dropTable('categoriesToRecipe')
      .dropTable('categories')
      .dropTable('ratings')
      .dropTable('instructions')
      .dropTableIfExists('ingredients')
      .dropTableIfExists('recipes')
      .dropTableIfExists('users')
      );
  };

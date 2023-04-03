/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
  return knex.schema.createTable('recipes', (table) => {
    table.increments('id').primary();
    table.string('title').notNullable();
    table.text('description');
    table.json('ingredients').notNullable();
    table.json('instructions').notNullable();
    table.string('category');
  });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
  return knex.schema.dropTable('recipes');
};

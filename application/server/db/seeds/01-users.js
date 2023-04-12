
exports.seed = function(knex) {
  
    return knex('users').insert([
      {username:"nate", email:"nate@email.com", password:"pass123"},
      {username:"duncan", email:"duncan@email.com", password:"pass234"},
      {username:"yueling", email:"yueling@email.com", password:"pass345"},
      {username:"marcel", email:"marcel@email.com", password:"pass456"}
    ]);
};
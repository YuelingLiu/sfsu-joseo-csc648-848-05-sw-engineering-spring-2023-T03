exports.seed = function(knex) {
  
    return knex('users').insert([
      {username:"nate", email:"nate@email.com", password:"pass123", profile_picture:"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS32qCsTAOwVERXT_mVOMOSmi043OrUr0KXW8L-L8s&s"},
      {username:"duncan", email:"duncan@email.com", password:"pass234", profile_picture:"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS32qCsTAOwVERXT_mVOMOSmi043OrUr0KXW8L-L8s&s"},
      {username:"yueling", email:"yueling@email.com", password:"pass345", profile_picture:"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS32qCsTAOwVERXT_mVOMOSmi043OrUr0KXW8L-L8s&s"},
      {username:"marcel", email:"marcel@email.com", password:"pass456", profile_picture:"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS32qCsTAOwVERXT_mVOMOSmi043OrUr0KXW8L-L8s&s"}
    ]);
};

exports.seed = function(knex) {
  
    return knex("recipes").insert([
      {userID: "1", title:"chicken pot pie", description:"a creamy, flacky chicken pot pie.",
        cookingTime:"90", difficulty:"3"},
        {userID: "2", title:"biscuits", description:"a flaky, soft, buttery biscuits",
        cookingTime:"45", difficulty:"2"}
    ])
};
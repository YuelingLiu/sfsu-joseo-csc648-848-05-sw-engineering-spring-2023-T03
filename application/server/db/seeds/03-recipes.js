exports.seed = function(knex) {
  
    return knex("recipes").insert([
      {user_id: "1", title:"chicken pot pie", description:"a creamy, flacky chicken pot pie.",
        cooking_time:"90", difficulty:"3"},
        {user_id: "2", title:"biscuits", description:"a flaky, soft, buttery biscuits",
        cooking_time:"45", difficulty:"2"}
    ])
};
/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */
exports.seed = async function(knex) {
  // Deletes ALL existing entries
  //await knex('users2').del()
  await knex('users2').insert([
    {id: 1, first_name: 'Admin',last_name: "Adminson"},
    {id: 2, first_name: 'Aliceson',last_name: "Alicesonson"},
    {id: 3, first_name: 'Bob', last_name: "Bobson"}
  ]);
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */
//income seed
exports.seed = async function(knex) {
  await knex('Spaceships').update({ revenue: 5000 });
  await knex('Crew_members').update({ income: 200 });
};

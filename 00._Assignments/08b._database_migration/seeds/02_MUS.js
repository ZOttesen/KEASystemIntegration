/**
 * @param { import("knex").Knex } knex
 */
//MUS seed
exports.seed = async function(knex) {
  await knex('Spaceships').update({ ServiceTime: '2022-01-01 00:00:00' });
  await knex('Crew_members').update({ ReviewDate: '2022-01-01 00:00:00' });
};
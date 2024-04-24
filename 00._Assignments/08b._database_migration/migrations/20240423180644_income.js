/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
//income
exports.up = function(knex) {

    return knex.schema
        // Add 'ServiceTime' column to 'Spaceships' table
        .table('Spaceships', function(table) {
            table.integer('revenue');
        })
        // Add 'ReviewDate' column to 'Crew_members' table
        .table('Crew_members', function(table) {
            table.integer('income');
        });
  
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {

    return knex.schema
        // Remove 'ServiceTime' column from 'Spaceships' table
        .table('Spaceships', function(table) {
            table.dropColumn('revenue');
        })
        // Remove 'ReviewDate' column from 'Crew_members' table
        .table('Crew_members', function(table) {
            table.dropColumn('income');
        });
};

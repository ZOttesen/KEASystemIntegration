/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
//MUS
exports.up = function(knex) {
    return knex.schema
        // Add 'ServiceTime' column to 'Spaceships' table
        .table('Spaceships', function(table) {
            table.dateTime('ServiceTime');
        })
        // Add 'ReviewDate' column to 'Crew_members' table
        .table('Crew_members', function(table) {
            table.dateTime('ReviewDate');
        });
};

exports.down = function(knex) {
    return knex.schema
        // Remove 'ServiceTime' column from 'Spaceships' table
        .table('Spaceships', function(table) {
            table.dropColumn('ServiceTime');
        })
        // Remove 'ReviewDate' column from 'Crew_members' table
        .table('Crew_members', function(table) {
            table.dropColumn('ReviewDate');
        });
};

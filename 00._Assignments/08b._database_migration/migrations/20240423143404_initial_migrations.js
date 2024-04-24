/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
//initial_migration
exports.up = function(knex) {
    return knex.schema
        .createTable('Spaceships', function (table) {
            table.increments('SpaceshipID').primary();
            table.string('SpaceshipName', 255);
            table.integer('SpaceshipSize');
        })
        .then(function () {
            return knex.schema.createTable('Crew_members', function (table) {
                table.increments('Crew_membersID').primary();
                table.integer('SpaceshipID').unsigned().references('SpaceshipID').inTable('Spaceships');
                table.string('Name', 255);
                table.integer('Age');
            });
        });
};

exports.down = function(knex) {
    return knex.schema
        .dropTable('Crew_members')
        .then(function () {
            return knex.schema.dropTable('Spaceships');
        });
};

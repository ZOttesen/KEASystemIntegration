/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
//initial_seed
exports.seed = async function(knex) {
    // Deletes ALL existing entries in Crew_members
    return knex('Crew_members').del()
        .then(function () {
            // Deletes ALL existing entries in Spaceships
            return knex('Spaceships').del();
        })
        .then(function () {
            // Inserts seed entries into Spaceships
            return knex('Spaceships').insert([
                {SpaceshipID: 1, SpaceshipName: 'Millennium Falcon', SpaceshipSize: 34},
                {SpaceshipID: 2, SpaceshipName: 'Star Destroyer', SpaceshipSize: 1600}
            ]);
        })
        .then(function () {
            // Inserts seed entries into Crew_members
            return knex('Crew_members').insert([
                {Crew_membersID: 1, SpaceshipID: 1, Name: 'Han Solo', Age: 35},
                {Crew_membersID: 2, SpaceshipID: 1, Name: 'Chewbacca', Age: 200},
                {Crew_membersID: 3, SpaceshipID: 2, Name: 'Darth Vader', Age: 45}
            ]);
        });
};
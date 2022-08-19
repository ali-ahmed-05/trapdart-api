/**
 * @param { import("knex").Knex } knex
 * @returns {Knex.SchemaBuilder}
 */
exports.up = async function(knex) {
    await knex.raw('CREATE EXTENSION IF NOT EXISTS "uuid-ossp"');

    return knex.schema.createTable('votes', function (t) {
        t.increments('id').primary().defaultTo(1);
        t.integer('proposals_id');
        t.string('voter_address').notNullable();
        t.string('selected_option').notNullable();

        t.timestamps(false, true);
    })
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
    return knex.schema.dropTableIfExists('votes');
};

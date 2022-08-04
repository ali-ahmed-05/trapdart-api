/**
 * @param { import("knex").Knex } knex
 * @returns {Knex.SchemaBuilder}
 */
exports.up = async function(knex) {
    await knex.raw('CREATE EXTENSION IF NOT EXISTS "uuid-ossp"');

    return knex.schema.createTable('strokes', function (t) {
        t.uuid('id').primary().defaultTo(knex.raw('uuid_generate_v4()'));
        t.json('proposal_ids').defaultTo(null);
        t.timestamps(false, true);
    })
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
    return knex.schema.dropTable('strokes');
};

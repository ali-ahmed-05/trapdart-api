/**
 * @param { import("knex").Knex } knex
 * @returns {Knex.SchemaBuilder}
 */
exports.up = async function (knex) {
    await knex.raw('CREATE EXTENSION IF NOT EXISTS "uuid-ossp"');

    return knex.schema.createTable('proposals', function (t) {
        t.increments('id').primary().defaultTo(1);
        t.string('title').notNullable()
        t.string('description').nullable()
        t.string('image').nullable()
        t.enu('vote_type', ['NFT', 'NORMAL']).defaultTo('NORMAL')
        t.json('options').defaultTo(null);
        t.dateTime("closing_date").notNullable();
        t.bigInteger('total_votes').defaultTo(0);
        t.timestamps(false, true);
    })
};

/**
 * @param { import("knex").Knex } knex
 * @returns {Promise<Knex.SchemaBuilder>}
 */
exports.down = async function (knex) {
    return knex.schema.dropTableIfExists('proposals');
};

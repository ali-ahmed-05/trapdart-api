const strokesModel = require('../models/strokes.model');

exports.seed = async function (knex) {
    await knex(strokesModel.table).del()
    // await knex(strokesModel.table).insert([
    //     {proposal_ids: null},
    //     {proposal_ids: null},
    //     {proposal_ids: null},
    // ]);
}
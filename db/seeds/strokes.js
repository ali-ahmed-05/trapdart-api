const strokesModel = require('../models/strokes.model');

exports.seed = async function (knex) {
    await knex(strokesModel.table).del()
    await knex(strokesModel.table).insert([
        {proposal_ids: '{"5%":0,"10%":0,"15%":0,"20%":0}'},
        {proposal_ids: '{"10%":0,"20%":0,"30%":0,"40%":0}'},
        {proposal_ids: '{"50%":0,"60%":0,"70%":0,"80%":0}'},
    ]);
}
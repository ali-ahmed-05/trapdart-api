const strokesModel = require('../models/strokes.model');

exports.seed = async function (knex) {
    await knex(strokesModel.table).del()
    await knex(strokesModel.table).insert([
        {proposal_ids: '{"0":123,"1":150,"2":1122}'},
        {proposal_ids: '{"0":123,"1":150,"2":1122}'},
        {proposal_ids: '{"0":123,"1":150,"2":1122}'},
    ]);
}
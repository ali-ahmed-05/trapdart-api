const moment = require('moment');
const TextModel = require('../models/text.modal');

exports.seed = async function (knex) {
    await knex(TextModel.table).del()
    await knex(TextModel.table).insert([
        {
            id: 1,
            title: 'November 3rd 2022', 
        }]);
}
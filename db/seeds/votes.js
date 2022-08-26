const moment = require('moment');
const VotesModel = require('../models/votes.model');

exports.seed = async function (knex) {
    await knex(VotesModel.table).del()
    // await knex(VotesModel.table).insert([
    //     {
    //         voter_address: 'some_random_text 1',
    //         selected_option: 'option 1',
    //         proposals_id: 0
    //     }, {
    //         voter_address: 'some_random_text 2',
    //         selected_option: 'option 2',
    //         proposals_id: 1
    //     },
    //     {
    //         voter_address: 'some_random_text 3',
    //         selected_option: 'option 3',
    //         proposals_id: 2
    //     },]);
}
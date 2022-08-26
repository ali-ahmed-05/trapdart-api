const moment = require('moment');
const ProposalModel = require('../models/proposals.model');

exports.seed = async function (knex) {
    await knex(ProposalModel.table).del()
    // await knex(ProposalModel.table).insert([
    //     {
    //         title: 'some_random_text 1',
    //         description: 'description 1',
    //         image: 'image 1',
    //         vote_type: 'NORMAL',
    //         options: '{"5%":0,"10%":0,"15%":0,"20%":0}',
    //         closing_date: moment().format('YYYY-MM-DDTHH:mm:ss'),
    //         total_votes: 0
    //     },
    //     {
    //         title: 'some_random_text 2',
    //         description: 'description 2',
    //         image: 'image 2',
    //         vote_type: 'NFT',
    //         options: '{"5%":0,"10%":0,"15%":0,"20%":0}',
    //         closing_date: moment().format('YYYY-MM-DDTHH:mm:ss'),
    //         total_votes: 1
    //     },
    //     {
    //         title: 'some_random_text 3',
    //         description: 'description 3',
    //         image: 'image 3',
    //         vote_type: 'NORMAL',
    //         options: '{"5%":0,"10%":0,"15%":0,"20%":0}',
    //         closing_date: moment().format('YYYY-MM-DDTHH:mm:ss'),
    //         total_votes: 2
    //     },
    // ]);
}
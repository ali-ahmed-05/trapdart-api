const moment = require('moment');
const PictureModel = require('../models/picture.modal');

exports.seed = async function (knex) {
    await knex(PictureModel.table).del()
    await knex(PictureModel.table).insert([
        {
            id: 1,
            image_url: null, 
        }]);
}
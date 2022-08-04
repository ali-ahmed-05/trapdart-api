const whitelist = require("../../utils/whitelist");
module.exports = {
    table: 'proposals',
    whitelist: (data) => whitelist(data, [
        'id',
        'title',
        'description',
        'closing_date',
        'total_votes',
        'image',
        'vote_type',
        'options'
    ])
}
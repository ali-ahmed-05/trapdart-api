const whitelist = require("../../utils/whitelist");
module.exports = {
    table: 'votes',
    whitelist: (data) => whitelist(data, [
        'id',
        'proposals_id',
        'voter_address',
        'selected_option'
    ])
}
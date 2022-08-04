const whitelist = require("../../utils/whitelist");
module.exports = {
    table: 'strokes',
    whitelist: (data) => whitelist(data, ['id', 'proposal_ids'])
}
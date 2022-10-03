const whitelist = require("../../utils/whitelist");
module.exports = {
    table: 'text',
    whitelist: (data) => whitelist(data, [
        'id',
        'title',
    ])
}
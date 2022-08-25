const whitelist = require("../../utils/whitelist");
module.exports = {
    table: 'picture',
    whitelist: (data) => whitelist(data, [
        'id',
        'image_url',
    ])
}
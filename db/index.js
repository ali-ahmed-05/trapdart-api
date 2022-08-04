const  { DB_CLIENT, DB_HOST, DB_USER, DB_PASSWORD, DB_PORT, DB_NAME } = process.env;

const db = require("knex")({
    client: DB_CLIENT,
    connection: {
        host: DB_HOST,
        user: DB_USER,
        password: DB_PASSWORD,
        port: DB_PORT,
        database: DB_NAME,
        charset: 'utf8',
        // debug: false,
    },
    useNullAsDefault: true
});

module.exports = db;
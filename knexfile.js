// Update with your config settings.
require('dotenv').config()
const {DB_CLIENT, DB_HOST, DB_USER, DB_PASSWORD, DB_PORT, DB_NAME, MIGRATION_DIR, SEED_DIR} = process.env;

module.exports = {
    client: DB_CLIENT,
    connection: {
        host: DB_HOST,
        port: DB_PORT,
        user: DB_USER,
        password: DB_PASSWORD,
        database: DB_NAME,
        charset: 'utf8',
        debug: false,
        // ssl: {
        //     rejectUnauthorized: false
        //   }
    },
    migrations: {
        directory: MIGRATION_DIR
    },
    seeds: {
        directory: SEED_DIR
    },
};
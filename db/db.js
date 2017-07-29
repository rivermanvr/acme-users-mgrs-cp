const pg = require( 'pg' );
const connection = process.env.DATABASE_URL || 'postgres://localhost/acme_sql';
const db = new pg.Client(connection);

module.exports = db

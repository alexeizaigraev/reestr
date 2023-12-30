const pgp = require('pg-promise')();

const CONNECTION_STRING = process.env.CONNECTION_STRING
const db = pgp(CONNECTION_STRING); // database instance;


module.exports = db
const { neon } = require('@neondatabase/serverless');

require('dotenv').config();

const connectionString = process.env.DATABASE_URL;

const sql = neon(connectionString);

module.exports = sql;
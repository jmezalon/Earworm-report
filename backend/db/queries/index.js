const pgp = require('pg-promise')({});
const db = pgp('postgress://localhost:5432/max_mezalon_final_practical');

module.exports = { db }

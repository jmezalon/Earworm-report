const pgp = require('pg-promise')({});
const db = pgp('postgress://localhost:5432/Max_Mezalon_Final_Practice');

module.exports = { db }

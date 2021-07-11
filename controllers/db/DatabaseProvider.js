'use strict';
const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database(process.env.SQLITE_DB_PATH);
module.exports = db;

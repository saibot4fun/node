const mysql = require('mysql');

const pool = mysql.createPool({
  host     : '',
  user     : '',
  password : '',
  database : ''
});

module.exports = pool;

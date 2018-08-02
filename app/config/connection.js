const mysql = require('mysql');

const pool = mysql.createPool({
  host     : 'mysql.dalchau.com.br',
  user     : 'dalchau40',
  password : 'dalchau88',
  database : 'dalchau40'
});

module.exports = pool;

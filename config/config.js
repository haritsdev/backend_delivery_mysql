const mysql = require('mysql');

const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'flutter_delivery_mysql',
});

db.connect(function (err) {
  if (err) throw err;
  console.log(`DATABASE CONNECTED !`);
});

module.exports = db;

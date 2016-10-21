var db = require('mariasql');

var connection = new db({
  host: '127.0.0.1',
  user: 'root',
  password: 'root',
  db: 'towers',
});

module.exports = connection;

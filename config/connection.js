var mysql = require("mysql");

var connection = mysql.connect({
    host: DB_host,
    user: DB_user,
    password: DB_password,
    database: DB_database
})

module.exports = connection;


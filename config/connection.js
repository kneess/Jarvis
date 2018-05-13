var mysql = require("mysql");

var connection = mysql.connect({
    port: 3306,
    host: "localhost",
    user: "root",
    password: "",
    database: "jarvis_db"
})

module.exports = connection;


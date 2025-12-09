const mysql2 = require("mysql2");

const connection = mysql2.createConnection({
	host: "localhost",
	user: "root",
	password: "password",
	database: "boolean_blog",
});

connection.connect((err) => {
	if (err) throw err;
	console.log("Connection to database successful!");
});

module.exports = connection;

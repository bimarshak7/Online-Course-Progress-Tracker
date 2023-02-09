const mysql = require("mysql2")

const client = mysql.createPool({
	user: process.env.DBUSER,
	password: process.env.DBPASSWORD,
	host: process.env.DBHOST,
	database: process.env.DBNAME,
	port: process.env.DBPORT,
	multipleStatements: true,
	connectionLimit: 100,
})

// const connectDB = async () => {
// 	if (client.state != "connected") {
// 		client.connect(function (err) {
// 			if (err) {
// 				console.error("Could not connect to database:: " + err)
// 				return
// 			} else console.log("Connected to db with id " + client.threadId)
// 			// console.log(client.state)
// 		})
// 	}
// }

module.exports = { client }

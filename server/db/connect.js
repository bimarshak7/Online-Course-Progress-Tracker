const mysql = require("mysql2")

const client = mysql.createConnection({
	user: process.env.DBUSER,
	password: process.env.DBPASSWORD,
	host: process.env.DBHOST,
	database: process.env.DBNAME,
	port: process.env.DBPORT,
})

const connectDB = async () => {
	if (client.state != "connected") {
		client.connect(function (err) {
			if (err) {
				console.error("Could not connect to database:: " + err)
				return
			} else console.log("Connected to db with id " + client.threadId)
			// console.log(client.state)
		})
	}
}

module.exports = { connectDB, client }

const fs = require("fs")
const mysql = require("mysql2")

// const { client } = require("./connect")
require("dotenv").config({ path: "../.env" })

const client = mysql.createConnection({
	user: process.env.DBUSER,
	password: process.env.DBPASSWORD,
	host: process.env.DBHOST,
	database: process.env.DBNAME,
	port: process.env.DBPORT,
	multipleStatements: true,
})

async function initDB() {
	// client.connect()
	let sql = fs.readFileSync("schema.sql", "utf8")

	const res = await client
		.promise()
		.query(sql)
		.then(result => {
			console.log("Database Intialized")
			return result
		})
		.catch(e => console.error(e.stack))

	process.exit()
}

initDB()

const { Client } = require("pg")

const client = new Client({
	user: process.env.PGUSER,
	password: process.env.PGPASSWORD,
	host: process.env.PGHOST,
	database: process.env.DATABASE,
	port: process.env.PGPORT,
})

async function connectDB() {
	try {
		await client.connect()
		console.log("Connected to database...\n")
	} catch (err) {
		console.log(err)
	}
}

module.exports = { connectDB, client }

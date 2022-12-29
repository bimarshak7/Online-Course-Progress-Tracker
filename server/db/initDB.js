const fs = require("fs")
const { Client } = require("pg")

// const { client } = require("./connect")
require("dotenv").config({ path: "../.env" })

const client = new Client({
	user: process.env.PGUSER,
	password: process.env.PGPASSWORD,
	host: process.env.PGHOST,
	database: process.env.DATABASE,
	port: process.env.PGPORT,
})

async function initDB() {
	client.connect()
	var sql = fs.readFileSync("schema.sql", "utf8")
	await client.query(sql)
	console.log("Database Initialized")

	process.exit()
}

initDB()

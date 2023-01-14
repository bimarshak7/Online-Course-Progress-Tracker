const { client } = require("../db/connect")
const bcrypt = require("bcrypt")

const { generateToken } = require("../utils/jwt")

const register = async (req, res) => {
	const { name, email, password } = req.body
	if (!name || !email || !password) {
		return res.status(500).json({ error: "Missing one or more field." })
	}

	try {
		//check if email is already used
		let results = await client
			.promise()
			.query("SELECT * FROM users WHERE email = ?", [email])
			.then(([rows, fields]) => {
				return rows
			})
			.catch(err => {
				console.log(err)
			})

		console.log("Row counts, ", results)
		if (results.length > 0)
			return res.status(500).json({ error: "Email already used" })

		//create and save new user
		const salt = await bcrypt.genSalt(10)

		client.query(
			"INSERT INTO users (name, email,password) VALUES (?, ?, ?) RETURNING *",
			[name, email, await bcrypt.hash(password, salt)],
			(error, results) => {
				if (error) {
					console.log(error)
					return res
						.status(500)
						.json({ error: "Something went wrong." })
				} else
					return res
						.status(201)
						.json({ "message": "User registered" })
			}
		)
	} catch (err) {
		console.log(err)
		return res.status(500).json({ error: "Something went wrong." })
	}
}

const login = async (req, res) => {
	const { email, password } = req.body
	if (!email || !password) {
		return res.status(500).json({ error: "Missing one or more field." })
	}
	let user = await client
		.promise()
		.query("SELECT * FROM users WHERE email = ?", [email])
		.then(([rows, fields]) => {
			return rows
		})
		.catch(e => console.error(e.stack))

	if (user.length === 0)
		return res.status(401).json({ error: "Invalid Credentials" })

	let val = await bcrypt.compare(password, user[0].password)
	if (val) {
		const token = generateToken({ puid: user[0].puid }, "2d")
		res.cookie("token", token, { httpOnly: true })
		return res.status(200).json({ message: "Login Sucessful !" })
	}
	return res.status(401).json({ error: "Invalid Credentials" })
}

const verify = async (req, res) => {
	return res.status(200).json({ message: "Login Sucessful !" })
}

const logout = async (req, res) => {
	res.clearCookie("token")
	return res.status(200).json({ message: "Logout Sucessful !" })
}

module.exports = { register, login, verify, logout }

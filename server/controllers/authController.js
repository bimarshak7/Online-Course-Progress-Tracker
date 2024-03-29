const { client } = require("../db/connect")
const bcrypt = require("bcrypt")

const { generateToken } = require("../utils/jwt")

const register = async (req, res) => {
	const { name, email, password, path } = req.body
	console.log(req.body)
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

		if (results.length > 0)
			return res.status(500).json({ error: "Email already used" })

		//create and save new user
		const salt = await bcrypt.genSalt(10)

		client.query(
			"INSERT INTO users (name, email,path,password) VALUES (?, ?, ?,?)",
			[name, email, path, await bcrypt.hash(password, salt)],
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
	let results = await client
		.promise()
		.query("SELECT * FROM users WHERE puid = ?", [req.sess.puid])
		.then(([rows, fields]) => {
			return rows
		})
		.catch(err => {
			console.log(err)
		})
	if (results.length > 0)
		return res.status(200).json({ message: "Login Sucessful !" })
	else return res.status(500).json({ error: "Invalid login !" })
}

const logout = async (req, res) => {
	res.clearCookie("token")
	return res.status(200).json({ message: "Logout Sucessful !" })
}

const getUser = async (req, res) => {
	try {
		let results = await client
			.promise()
			.query(
				"SELECT users.name,users.email,users.path,count(t.remarks) as this_week FROM users LEFT JOIN courses ON users.puid=courses.puid LEFT JOIN (SELECT * FROM chapters WHERE DATE_COMPLETED>(SELECT DATE_SUB(DATE(NOW()), INTERVAL DAYOFWEEK(NOW())-1 DAY))) AS t ON t.cid=courses.id WHERE users.puid=?  GROUP BY users.name, users.email, users.path",
				[req.sess.puid]
			)
			.then(([rows, fields]) => {
				return rows
			})
			.catch(err => {
				console.log(err)
			})

		if (results)
			return res.status(200).json({ message: "success", res: results[0] })
	} catch (err) {
		console.log(err)
	}
	return res.status(401).json({ error: "Something went wrong" })
}

module.exports = { register, login, verify, logout, getUser }

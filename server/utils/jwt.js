const jwt = require("jsonwebtoken")

const generateToken = (data, exp) => {
	return jwt.sign(data, process.env.JWT_SECRET, { expiresIn: exp })
}

module.exports = { generateToken }

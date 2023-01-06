const jwt = require("jsonwebtoken")

const generateToken = (data, exp) => {
	return jwt.sign(data, process.env.JWT_SECRET, { expiresIn: exp })
}

const verifyToken = token => {
	return (data = jwt.verify(token, process.env.JWT_SECRET))
}

module.exports = { generateToken, verifyToken }

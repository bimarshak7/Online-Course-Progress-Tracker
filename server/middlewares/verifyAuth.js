const { verifyToken } = require("../utils/jwt")

const verifyAuth = (req, res, next) => {
	const { token } = req.cookies
	try {
		req.sess = verifyToken(token)
		// console.log(req.sess)
		return next()
	} catch {
		return res.status(401).json({ error: "Missing Auth token" })
	}
}

module.exports = verifyAuth

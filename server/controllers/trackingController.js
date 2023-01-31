const { client } = require("../db/connect")

const updateStatus = async (req, res) => {
	const body = req.body
	console.log(body)
	try {
		return res.status(200).json({ message: "Updated" })
	} catch (err) {
		console.log(err)
		return res.status(500).json({ error: "Something went wrong." })
	}
}

module.exports = { updateStatus }

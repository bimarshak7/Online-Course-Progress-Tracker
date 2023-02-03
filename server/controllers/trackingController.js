const { client } = require("../db/connect")

const updateStatus = async (req, res) => {
	const { id } = req.query
	const body = req.body

	try {
		let updated = {}
		if (parseInt(body?.chNo)) {
			console.log("Updating chapters")
			updated = await client
				.promise()
				.query(
					"UPDATE chapters SET completed = NOT completed where cid=(SELECT id from courses where pcid=?) AND chNo=?",
					[id, body.chNo, id]
				)
				.then(rows => {
					return { success: true }
				})
				.catch(err => {
					console.log(err)
				})
		}

		console.log("Updating course")
		updated = await client
			.promise()
			.query(
				"UPDATE courses SET completed = IF((SELECT COUNT(*) FROM chapters where completed=0 AND cid=(SELECT id from courses where pcid=?))>0,0,1) where pcid=?",
				[id, id]
			)
			.then((rows, fields) => {
				return { success: true }
			})
			.catch(err => {
				console.log(err)
				return { success: false }
			})
		let { completed } = await client
			.promise()
			.query("SELECT completed from courses where pcid=?", [id])
			.then((rows, fields) => {
				return rows[0][0]
			})
			.catch(err => {
				console.log(err)
				return { success: false }
			})
		console.log(completed)
		if (updated.success)
			return res.status(200).json({
				message: completed
					? "Congrats! Course copleted"
					: "Course Updated",
			})
	} catch (err) {
		console.log(err)
	}
	return res.status(500).json({ error: "Something went wrong." })
}

module.exports = { updateStatus }

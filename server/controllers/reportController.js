const { client } = require("../db/connect")

const getReport = async (req, res) => {
	const puid = req.sess.puid

	try {
		const courseCat = await client
			.promise()
			.query(
				"SELECT category,COUNT(category) AS count from courses WHERE puid=? GROUP BY category;",
				[puid]
			)
			.then((rows, fields) => {
				return rows[0]
			})
			.catch(err => {
				console.log(err)
			})
		const chapterWeek = await client
			.promise()
			.query(
				"SELECT DATE_FORMAT(date_completed,'%b %d') as date,COUNT(date_completed) AS count FROM  chapters WHERE  cid IN(SELECT id FROM courses WHERE puid=?) AND date_completed BETWEEN DATE_SUB(NOW(),INTERVAL 1 WEEK) and NOW() GROUP BY date_completed;",
				[puid]
			)
			.then((rows, fields) => {
				return rows[0]
			})
			.catch(err => {
				console.log(err)
			})
		return res.status(200).json({
			message: "Success",
			data: { courseCat: courseCat, chapterWeek: chapterWeek },
		})
	} catch (err) {
		console.log(err)
	}
	return res.status(500).json({ error: "Something went wrong." })
}

module.exports = { getReport }

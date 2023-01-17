const { client } = require("../db/connect")

const addCourse = async (req, res) => {
	const { name, chapters, category } = req.body
	if (!name || !chapters || !category) {
		return res.status(500).json({ error: "Missing one or more field." })
	}
	try {
		client.query(
			"INSERT INTO courses (name, chapters,category,puid) VALUES (?, ?, ?, ?)",
			[name, chapters, category, req.sess.puid],
			(error, results) => {
				if (error) {
					return res
						.status(500)
						.json({ error: "Something went wrong." })
				} else {
					// console.log("Reuslt: ", results)
					return res.status(200).json({ "message": "Course Added" })
				}
			}
		)
	} catch (err) {
		console.log(err)
		return res.status(500).json({ error: "Something went wrong." })
	}
}

const deleteCourse = async (req, res) => {
	const { id } = req.body
	if (!id) {
		return res.status(500).json({ error: "Missing one or more field." })
	}
	try {
		client.query(
			"DELETE FROM courses WHERE id=?",
			[id],
			(error, results) => {
				if (error) {
					console.log(error)
					return res
						.status(500)
						.json({ error: "Something went wrong." })
				} else
					return res.status(200).json({ "message": "Course Deleted" })
			}
		)
	} catch (err) {
		console.log(err)
		return res.status(500).json({ error: "Something went wrong." })
	}
}

const listCourse = async (req, res) => {
	try {
		let courses = await client
			.promise()
			.query(
				"SELECT pcid,name,chapters,category,DATE_FORMAT(added_on,'%b %d, %Y') as added_on,completed FROM courses WHERE puid=? ORDER BY added_on DESC",
				[req.sess.puid]
			)
			.then(([rows, fields]) => {
				return rows
			})
			.catch(err => {
				return false
			})
		if (courses)
			return res
				.status(200)
				.json({ "message": "Success", data: courses ? courses : [] })
		else return res.status(500).json({ error: "Something went wrong." })
	} catch (err) {
		console.log(err)
		return res.status(500).json({ error: "Something went wrong." })
	}
}

module.exports = { addCourse, listCourse, deleteCourse }

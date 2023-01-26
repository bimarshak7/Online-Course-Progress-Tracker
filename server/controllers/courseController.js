const { client } = require("../db/connect")

const addCourse = async (req, res) => {
	const { name, chapters, category } = req.body
	if (!name || !chapters || !category) {
		return res.status(500).json({ error: "Missing one or more field." })
	}
	// console.log(name, category, chapters, chapters.length)
	try {
		let results1 = await client
			.promise()
			.query(
				"INSERT INTO courses (name, chapters,category,puid) VALUES (?, ?, ?, ?)",
				[name, chapters.length, category, req.sess.puid]
			)
			.then(([rows, fields]) => {
				return rows
			})
			.catch(err => {
				return err
			})

		if (results1.errno)
			return res.status(500).json({ error: "Something went wrong." })

		let values = []

		chapters.forEach(chapter => {
			chapter.cid = results1.insertId
			if (chapter.title.length > 0) values.push(Object.values(chapter))
		})

		console.log("Values", values)

		if (chapters.length > 0) {
			let results2 = await client
				.promise()
				.query(
					"INSERT INTO chapters(title,remarks,chNo,cid) VALUES ?",
					[values]
				)
				.then(([rows, fields]) => {
					return rows
				})
				.catch(err => {
					console.log(err)
					return err
				})
			if (results2.errno)
				return res.status(500).json({ error: "Something went wrong." })
		}

		return res.status(200).json({ "message": "Course Added" })
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
				"SELECT pcid,name,chapters,category,DATE_FORMAT(added_on,'%b %d, %Y') as added_date,completed FROM courses WHERE puid=? ORDER BY added_on DESC",
				[req.sess.puid]
			)
			.then(([rows, fields]) => {
				return rows
			})
			.catch(err => {
				console.log(err)
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

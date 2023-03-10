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
				"INSERT INTO courses (name,category,puid) VALUES (?, ?, ?)",
				[name, category, req.sess.puid]
			)
			.then(([rows, fields]) => {
				return rows
			})
			.catch(err => {
				console.log(err)
				return err
			})

		if (results1.errno)
			return res.status(500).json({ error: "Something went wrong." })

		let values = []

		chapters.forEach((chapter, idx) => {
			chapter.cid = results1.insertId
			chapter.chNo = parseInt(idx) + 1
			if (chapter.title.length > 0) values.push(Object.values(chapter))
		})

		if (chapters.length > 0) {
			let results2 = await client
				.promise()
				.query(
					"INSERT INTO chapters(title,remarks,cid,chNo) VALUES ?",
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
	const { id, chNo = 0 } = req.body

	if (!id) {
		return res.status(500).json({ error: "Missing course pcid." })
	}
	try {
		if (chNo === 0) {
			client.query(
				"DELETE FROM courses WHERE pcid=?",
				[id],
				(error, results) => {
					if (error) {
						console.log(error)
						return res
							.status(500)
							.json({ error: "Something went wrong." })
					} else {
						if (results.affectedRows == 0)
							return res
								.status(404)
								.json({ "error": "Course not found" })
						return res
							.status(200)
							.json({ "message": "Course Deleted" })
					}
				}
			)
		} else {
			client.query(
				`DELETE FROM chapters WHERE cid=(SELECT id FROM courses WHERE pcid=?) AND chNo=?;
				UPDATE chapters SET chNo=chNo-1 WHERE chNo>? AND cid=(SELECT id FROM courses where pcid=?);
				`,
				[id, parseInt(chNo), parseInt(chNo), id],
				(error, results) => {
					if (error) {
						console.log(error)
						return res
							.status(500)
							.json({ error: "Something went wrong." })
					} else {
						console.log(results[0])
						if (results[0].affectedRows === 0)
							return res.status(404).json({
								"error": "Chapter or course not found",
							})
						return res.status(200).json({
							"message": `Chapter ${chNo} Deleted.`,
							chNo: chNo,
						})
					}
				}
			)
		}
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
				"SELECT pcid,name,(SELECT COUNT(*) FROM chapters WHERE cid=courses.id) as chapters,category,DATE_FORMAT(added_on,'%b %d, %Y') as added_date,completed FROM courses WHERE puid=? ORDER BY added_on DESC",
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

const getCourse = async (req, res) => {
	const { id } = req.query
	try {
		let course = await client
			.promise()
			.query(
				"SELECT id,pcid,name,(SELECT COUNT(*) FROM chapters WHERE cid=courses.id) as chapters,category,DATE_FORMAT(added_on,'%b %d, %Y') as added_date,completed FROM courses WHERE puid=? AND pcid=? ORDER BY added_on DESC",
				[req.sess.puid, id]
			)
			.then(([rows, fields]) => {
				return rows
			})
			.catch(err => {
				console.log(err)
				return false
			})

		if (course.length === 0)
			return res.status(500).json({ error: "Course not found!" })

		let chapters = await client
			.promise()
			.query(
				"SELECT title,remarks,chNo,completed,DATE_FORMAT(date_completed,'%b %d, %Y') as date_completed FROM chapters WHERE cid=?",
				[course[0].id]
			)
			.then(([rows, fields]) => {
				return rows
			})
			.catch(err => {
				console.log(err)
				return err
			})
		delete course[0].id
		return res.status(200).json({
			"message": "Success",
			data: { course: course[0], chapters: chapters },
		})
	} catch (err) {
		console.log(err)
		return res.status(500).json({ error: "Something went wrong." })
	}
}

const updateCourse = async (req, res) => {
	const { course, chapters } = req.body
	const { id } = req.query
	// console.log("Course:", course, "\nChapter:", chapters, "\nid:", id)
	try {
		let success = true
		if (course) {
			let courseU = await client
				.promise()
				.query("UPDATE courses SET ? WHERE pcid=?", [course, id])
				.then(([rows, fields]) => {
					success = true
					return rows
				})
				.catch(err => {
					success = false
					console.log(err)
					return false
				})
		}
		if (chapters.length > 0) {
			let cid = await client
				.promise()
				.query("SELECT id from courses WHERE pcid=?", [id])
				.then(([rows, fields]) => {
					return rows[0].id
				})
				.catch(err => {
					console.log(err)
					return false
				})

			let values = []
			chapters.forEach(chapter => {
				const { title, remarks, chNo } = chapter
				if (title && remarks && chNo) chapter.cid = cid
				values.push(Object.values(chapter))
			})

			let chapterU = await client
				.promise()
				.query(
					"REPLACE INTO chapters(title,remarks,chNo,cid) VALUES ?",
					[values, id]
				)
				.then(([rows, fields]) => {
					return rows
				})
				.catch(err => {
					success = false
					console.log(err)
					return false
				})
		}
		if (success)
			return res.status(200).json({ "message": "Update Success" })
	} catch (err) {
		console.log(err)
	}
	return res.status(500).json({ error: "Something went wrong." })
}

module.exports = {
	addCourse,
	listCourse,
	deleteCourse,
	getCourse,
	updateCourse,
}

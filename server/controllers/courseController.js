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

		chapters.forEach((chapter, idx) => {
			console.log(chapter, idx)
			chapter.cid = results1.insertId
			chapter.chNo = parseInt(idx) + 1
			if (chapter.title.length > 0) values.push(Object.values(chapter))
		})
		console.log(chapters)
		console.log("Values", values)

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

const getCourse = async (req, res) => {
	const { id } = req.query
	console.log("Get courses....")
	try {
		let course = await client
			.promise()
			.query(
				"SELECT id,pcid,name,chapters,category,DATE_FORMAT(added_on,'%b %d, %Y') as added_date,completed FROM courses WHERE puid=? AND pcid=? ORDER BY added_on DESC",
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

module.exports = { addCourse, listCourse, deleteCourse, getCourse }

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
			chapter.cid = results1.insertId
			chapter.chNo = parseInt(idx) + 1
			if (chapter.title.length > 0) values.push(Object.values(chapter))
		})

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
		return res.status(500).json({ error: "Missing course pcid." })
	}
	try {
		client.query(
			"DELETE FROM courses WHERE pcid=?",
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

const deleteChapter = async (req, res) => {
	const { pcid, chNo } = req.body
	if (!pcid || !chNo) {
		return res.status(500).json({ error: "Missing one or more fields." })
	}
	try {
		client.query(
			`DELETE FROM chapters WHERE cid=(SELECT id FROM courses where pcid=?) and chNo=?;
			UPDATE courses set chapters=chapters-1 where pcid=?;
			UPDATE chapters set chNo=chNo-1 where chNo>? and cid=(SELECT id FROM courses where pcid=?);`,
			[pcid, parseInt(chNo), pcid, parseInt(chNo), pcid],
			(error, results) => {
				if (error) {
					console.log(error)
					return res
						.status(500)
						.json({ error: "Something went wrong." })
				} else
					return res
						.status(200)
						.json({ "message": "Chapter Deleted" })
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

module.exports = {
	addCourse,
	listCourse,
	deleteCourse,
	deleteChapter,
	getCourse,
}

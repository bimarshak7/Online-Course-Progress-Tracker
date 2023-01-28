const express = require("express")
const courseRouter = express.Router()

const {
	addCourse,
	listCourse,
	deleteCourse,
	getCourse,
} = require("../controllers/courseController.js")
const verifyAuth = require("../middlewares/verifyAuth")

courseRouter.post("/add", verifyAuth, addCourse)
courseRouter.get("/list", verifyAuth, listCourse)
courseRouter.get("/", verifyAuth, getCourse)
courseRouter.delete("/", verifyAuth, deleteCourse)

module.exports = courseRouter

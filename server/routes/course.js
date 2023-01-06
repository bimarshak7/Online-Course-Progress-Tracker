const express = require("express")
const courseRouter = express.Router()

const {
	addCourse,
	listCourse,
	deleteCourse,
} = require("../controllers/courseController.js")
const verifyAuth = require("../middlewares/verifyAuth")

courseRouter.post("/add", verifyAuth, addCourse)
courseRouter.get("/list", verifyAuth, listCourse)
courseRouter.delete("/", verifyAuth, deleteCourse)

module.exports = courseRouter

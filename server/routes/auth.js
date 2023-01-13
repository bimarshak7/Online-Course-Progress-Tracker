const express = require("express")
const authRouter = express.Router()

const {
	register,
	login,
	verify,
	logout,
} = require("../controllers/authController.js")

const verifyAuth = require("../middlewares/verifyAuth")

authRouter.route("/register").post(register)
authRouter.route("/login").post(login)
authRouter.route("/verify").get(verifyAuth, verify)
authRouter.route("/logout").get(verifyAuth, logout)

module.exports = authRouter

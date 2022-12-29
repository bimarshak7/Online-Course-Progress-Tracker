const express = require("express")
const authRouter = express.Router()

const { register, login } = require("../controllers/authController.js")

authRouter.route("/register").post(register)
authRouter.route("/login").post(login)

module.exports = authRouter

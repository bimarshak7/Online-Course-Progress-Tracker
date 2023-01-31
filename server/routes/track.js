const express = require("express")
const trackRouter = express.Router()

const { updateStatus } = require("../controllers/trackingController")
const verifyAuth = require("../middlewares/verifyAuth")

trackRouter.put("/", verifyAuth, updateStatus)

module.exports = trackRouter

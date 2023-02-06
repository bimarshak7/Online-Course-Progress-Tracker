const express = require("express")

const reportRouter = express.Router()

const { getReport } = require("../controllers/reportController")
const verifyAuth = require("../middlewares/verifyAuth")

reportRouter.get("/", verifyAuth, getReport)

module.exports = reportRouter

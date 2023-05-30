const express = require("express")
const path = require("path")
const cookieParser = require("cookie-parser")
require("dotenv").config()

const app = express()

const authRouter = require("./routes/auth.js")
const courseRouter = require("./routes/course")
const trackRouter = require("./routes/track")
const reportRouter = require("./routes/report")

// const { connectDB } = require("./db/connect")

app.use((req, res, next) => {
	console.log(`~ ${req.method} ${req.url}`)
	next()
})

app.use(express.json())
app.use(
	express.urlencoded({
		extended: true,
	})
)

app.use(cookieParser())

// app.get("/", (req, res) => {
// 	res.send("Welcome!")
// })

app.use("/api/auth", authRouter)
app.use("/api/course", courseRouter)
app.use("/api/track", trackRouter)
app.use("/api/report", reportRouter)
app.use(express.static(path.resolve(__dirname, "./dist")))

app.all("*", (_req, res) => {
	if (process.env.NODE_ENV === "production")
		return res.sendFile(path.resolve(__dirname, "./dist/index.html"))
	return res.status(404).json({ error: "Url Not found" })
})

const port = process.env.PORT || 5000

const start = async () => {
	try {
		// await connectDB()
		app.listen(port, () => {
			console.log(`Server is listening on port ${port}...`)
		})
	} catch (error) {
		console.log(error)
	}
}

start()

const express = require("express")
const app = express()

require("dotenv").config()
const authRouter = require("./routes/auth.js")

const { connectDB } = require("./db/connect")

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

app.get("/", (req, res) => {
	res.send("Welcome!")
})

app.use("/api/auth", authRouter)

const port = process.env.PORT || 5000

const start = async () => {
	try {
		await connectDB()
		app.listen(port, () => {
			console.log(`Server is listening on port ${port}...`)
		})
	} catch (error) {
		console.log(error)
	}
}

start()

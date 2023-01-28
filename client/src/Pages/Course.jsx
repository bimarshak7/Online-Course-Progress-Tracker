import { useParams } from "react-router-dom"

const Course = () => {
	const params = useParams()
	console.log("Params:", params)
	return (
		<div>
			<h1>Course blabalbal</h1>
		</div>
	)
}

export default Course

import { Link } from "react-router-dom"

const CourseCard = ({ course }) => {
	return (
		<Link to={`/home/course/${course.pcid}`}>
			<div
				className={`box-border pl-4 flex flex-col ${
					course.completed ? "bg-green-900" : "bg-red-800"
				} cursor-pointer p-2 border rounded-md hover:shadow-md hover:shadow-blue-700 transition duration-300 ease-in-out`}
			>
				<h3 className="text-xl">{course.name}</h3>
				<div className="grid grid-cols-2">
					<li className="ml-8">{course.category.toUpperCase()}</li>
					<li className="ml-8">{course.chapters} Chapters</li>
				</div>
				<li className="ml-8">Added on {course.added_date}</li>
			</div>
		</Link>
	)
}

export default CourseCard

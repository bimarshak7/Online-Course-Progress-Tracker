const CourseCard = ({ course }) => {
	return (
		<div
			className={`flex flex-col ${
				course.completed ? "bg-green" : "bg-red"
			}-900 cursor-pointer p-2 border rounded-md hover:shadow-md hover:shadow-blue-700 transition duration-300 ease-in-out`}
		>
			<h3 className="text-xl">{course.name}</h3>
			<div className="flex px-2 gap-10">
				<li className="ml-2">{course.category.toUpperCase()}</li>
				<li className="ml-2">{course.chapters} Chapters</li>
				<li className="ml-2">Added on {course.added_date}</li>
			</div>
		</div>
	)
}

export default CourseCard

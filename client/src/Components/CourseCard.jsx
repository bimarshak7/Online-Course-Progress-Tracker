const CourseCard = ({ course }) => {
	return (
		<div
			key={course.pcid}
			className="flex flex-col bg-yellow-700 p-2 rounded-md"
		>
			<h3 key={course.pcid} className="text-xl">
				{course.name}
			</h3>
			<div className="flex px-2 gap-10">
				<li className="ml-2">{course.category.toUpperCase()}</li>
				<li className="ml-2">{course.chapters} Chapters</li>
				<li className="ml-2">Added on {course.added_date}</li>
			</div>
		</div>
	)
}

export default CourseCard

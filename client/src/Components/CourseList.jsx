import { useState, useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { BsPlusLg } from "react-icons/bs"

import { listCourses } from "../redux/actions/course"
import { CourseForm, CourseCard } from "../Components"

const CourseList = () => {
	const [show, setShow] = useState(false)
	const courses = useSelector(state => state.course.courses)
	const dispatch = useDispatch()

	useEffect(() => {
		dispatch(listCourses(0))
	}, [])

	return (
		<>
			<div
				onClick={e => setShow(true)}
				className="flex border border-red-800 text-white gap-2 my-4 mx-auto w-1/3 text-2xl bg-slate-900 py-2 rounded justify-center cursor-pointer"
			>
				<BsPlusLg className="ml-4 text-2xl my-auto" />
				<h2>Add new course</h2>
			</div>
			{show && <CourseForm setShow={setShow} />}
			<div className="">
				<h2 className="text-2xl mb-4">My Courses</h2>
				<div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
					{courses &&
						courses.map(course => {
							return (
								<CourseCard course={course} key={course.pcid} />
							)
						})}
				</div>
			</div>
		</>
	)
}

export default CourseList

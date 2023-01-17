import { useState, useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { BsPlusLg } from "react-icons/bs"

import { CourseForm } from "../Components"
import { listCourses } from "../redux/actions/course"

const Home = () => {
	const [show, setShow] = useState(false)
	const courses = useSelector(state => state.course.courses)
	const dispatch = useDispatch()

	useEffect(() => {
		dispatch(listCourses(0))
	}, [])

	return (
		<div className="flex mx-4 gap-8 m-2">
			<div className="w-1/4 border-r-2 border-red-900">jgrkj</div>
			<div className="flex flex-col w-3/4">
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
					<div className="flex flex-col gap-4">
						{courses &&
							courses.map(course => {
								return (
									<div
										key={course.pcid}
										className="flex flex-col bg-yellow-700 p-2 rounded-md"
									>
										<h3
											key={course.pcid}
											className="text-xl"
										>
											{course.name}
										</h3>
										<div className="flex px-2 gap-10">
											<li className="ml-2">
												{course.category.toUpperCase()}
											</li>
											<li className="ml-2">
												{course.chapters} Chapters
											</li>
											<li className="ml-2">
												Added on {course.added_on}
											</li>
										</div>
									</div>
								)
							})}
					</div>
				</div>
			</div>
		</div>
	)
}

export default Home

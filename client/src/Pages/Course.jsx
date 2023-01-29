import { useEffect } from "react"
import { useParams } from "react-router-dom"
import { useDispatch, useSelector } from "react-redux"
import {
	BiCategory,
	BiBook,
	BiCalendarPlus,
	BiLoader,
	BiEdit,
	BiTrashAlt,
	BiCheck,
	BiEditAlt,
} from "react-icons/bi"
import { RxCross2 } from "react-icons/rx"

import { getSingleCourse } from "../redux/actions/course"
import { Loading } from "../Components"

const Course = () => {
	const { id } = useParams()
	const course = useSelector(state => state.course.singleCourse)
	const dispatch = useDispatch()

	useEffect(() => {
		if (id) dispatch(getSingleCourse(id))
	}, [id])

	if (!course) return <Loading />

	return (
		<div className="flex flex-col gap-4">
			<div className="flex gap-12">
				<h1 className="text-3xl font-semibold">{course.course.name}</h1>
				<div className="flex gap-2">
					<BiEdit className="text-2xl leading-5 cursor-pointer hover:text-yellow-500" />
					<BiTrashAlt className="text-2xl leading-5 cursor-pointer hover:text-rose-800" />
				</div>
			</div>

			<div className="course-prop bg-red-700 py-4 px-8 rounded-md w-fit">
				<li>
					<BiCategory /> {course.course.category}
				</li>
				<li>
					<BiBook />
					{course.course.chapters} chapters
				</li>
				<li>
					<BiCalendarPlus />
					{course.course.added_date}
				</li>
				<li>
					<BiLoader />
					{course.course.completed ? "Completed" : "In Progress"}
				</li>
			</div>
			<h2 className="text-2xl font-bold mt-4 underline">Chapters</h2>
			<div class="flex flex-col">
				<div class="overflow-x-auto sm:-mx-6 lg:-mx-8 ">
					<div class="py-2 inline-block w-4/5 sm:px-6 lg:px-8">
						<div class="overflow-hidden rounded-md">
							<table class="min-w-full ">
								<thead class="font-bold border-b bg-zinc-600 text-lg">
									<tr>
										<th
											scope="col"
											class="  px-6 py-4 text-left"
										>
											#
										</th>
										<th
											scope="col"
											class=" px-6 py-4 text-left"
										>
											Title
										</th>
										<th scope="col" class=" text-left">
											Remarks
										</th>
										<th scope="col" class=" text-left">
											Actions
										</th>
									</tr>
								</thead>
								<tbody>
									{course.chapters.length > 0 ? (
										course.chapters.map(chapter => {
											return (
												<tr
													key={chapter.chNo}
													class="bg-gray-900 border-b text-white text-left text-lg"
												>
													<td class="px-6 py-4 ">
														{chapter.chNo}
													</td>
													<td class="px-6 py-4 ">
														{chapter.title}
													</td>
													<td class="py-4 whitespace-nowrap">
														{chapter.remarks}
													</td>
													<td class="py-4 whitespace-nowrap flex gap-2 text-3xl">
														<BiCheck className="cursor-pointer  hover:text-cyan-400" />
														<BiEditAlt className="cursor-pointer hover:text-violet-700" />
														<RxCross2 className="hover:text-rose-900 cursor-pointer" />
													</td>
												</tr>
											)
										})
									) : (
										<h2 className="text-center py-2">
											No chapters in this course.
										</h2>
									)}
								</tbody>
							</table>
						</div>
					</div>
				</div>
			</div>
		</div>
	)
}

export default Course

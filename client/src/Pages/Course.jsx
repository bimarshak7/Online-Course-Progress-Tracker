import { useEffect, useState } from "react"
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

import { getSingleCourse, deleteCourse } from "../redux/actions/course"
import { Loading, ConfirmDiag } from "../Components"

const Course = () => {
	const { id } = useParams()
	const course = useSelector(state => state.course.singleCourse)
	const isLoading = useSelector(state => state.misc.isLoading)
	const [del, setDel] = useState({ show: false, title: "", ch: 0 })

	const dispatch = useDispatch()

	useEffect(() => {
		if (id) dispatch(getSingleCourse(id))
	}, [id])

	const handleDelete = params => {
		dispatch(deleteCourse(params))
		setDel(prev => ({ ...prev, show: false }))
	}
	if (!course && isLoading) return <Loading />

	if (!course && !isLoading)
		return <h1 className="text-2xl">Course Not found</h1>
	return (
		<div className="flex flex-col gap-4">
			{del.show && (
				<ConfirmDiag
					title={del.title}
					setShow={setDel}
					yesFunc={handleDelete}
					params={{ id: course.course.pcid, chNo: del.ch }}
				/>
			)}
			<div className="flex gap-12">
				<h1 className="text-3xl font-semibold">{course.course.name}</h1>
				<div className="flex gap-2">
					<BiEdit className="text-2xl leading-5 cursor-pointer hover:text-yellow-500" />
					<BiTrashAlt
						onClick={e =>
							setDel({
								ch: 0,
								show: true,
								title: "Delete Course.",
							})
						}
						className="text-2xl leading-5 cursor-pointer hover:text-rose-800"
					/>
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
			<div className="flex flex-col">
				<div className="overflow-x-auto sm:-mx-6 lg:-mx-8 ">
					<div className="py-2 inline-block w-4/5 sm:px-6 lg:px-8">
						<div className="overflow-hidden rounded-md">
							<table className="min-w-full ">
								<thead className="font-bold border-b bg-slate-800 text-lg">
									<tr>
										<th
											scope="col"
											className="  px-6 py-4 text-left"
										>
											#
										</th>
										<th
											scope="col"
											className=" px-6 py-4 text-left"
										>
											Title
										</th>
										<th scope="col" className=" text-left">
											Remarks
										</th>
										<th scope="col" className=" text-left">
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
													className="bg-gray-900 hover:bg-lime-700 border-b text-white text-left text-lg"
												>
													<td className="px-6 py-4 ">
														{chapter.chNo}
													</td>
													<td className="px-6 py-4 ">
														{chapter.title}
													</td>
													<td className="py-4 whitespace-nowrap">
														{chapter.remarks}
													</td>
													<td className="py-4 whitespace-nowrap flex gap-2 text-2xl">
														<BiCheck className="cursor-pointer  hover:text-cyan-400" />
														<BiEditAlt className="cursor-pointer hover:text-yellow-500" />
														<RxCross2
															className="hover:text-rose-900 cursor-pointer"
															onClick={e =>
																setDel({
																	ch: chapter.chNo,
																	show: true,
																	title: "Delete Chapter.",
																})
															}
														/>
													</td>
												</tr>
											)
										})
									) : (
										<tr className="text-center py-2">
											<td>No chapters in this course.</td>
										</tr>
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

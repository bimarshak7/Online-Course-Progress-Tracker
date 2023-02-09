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
	BiTrophy,
	BiRecycle,
	BiSave,
} from "react-icons/bi"
import { RxCross2 } from "react-icons/rx"

import {
	getSingleCourse,
	deleteCourse,
	updateCourse,
	editCourse,
} from "../redux/actions/course"
import { Loading, ConfirmDiag } from "../Components"

const Course = () => {
	const { id } = useParams()
	const course = useSelector(state => state.course.singleCourse)
	const isLoading = useSelector(state => state.misc.isLoading)
	const [del, setDel] = useState({ show: false, title: "", ch: 0 })
	const [edit, setEdit] = useState({ course: false, ch: 0 })
	const [change, setChange] = useState({ chapters: {} })

	const dispatch = useDispatch()

	useEffect(() => {
		if (id) dispatch(getSingleCourse(id))
	}, [id])

	const handleDelete = params => {
		dispatch(deleteCourse(params))
		setDel(prev => ({ ...prev, show: false }))
	}

	const handleUpdate = chNo => {
		dispatch(updateCourse({ id, chNo }))
	}
	const clickEdit = no => {
		if (no == 0) {
			setEdit(prev => ({
				...prev,
				course: !edit.course,
			}))
			if (!change.course)
				setChange({
					...change,
					course: {
						name: course.course.name,
						category: course.course.category,
					},
				})
		} else {
			setEdit(prev => ({
				...prev,
				ch: no == prev.ch ? 0 : no,
			}))
			if (!change.chapters[no]) {
				let { title, remarks } = course.chapters[no - 1]
				let up = change
				change.chapters[no] = {
					title: title,
					remarks: remarks,
					chNo: no,
				}
				setChange(up)
			}
		}
	}
	const handleSave = () => {
		dispatch(editCourse({ change, id }))
		setChange({ chapters: {} })
	}
	const UpdateIc = ({ chNo }) => {
		if (course.course.completed)
			return (
				<BiRecycle
					className="cursor-pointer  hover:text-cyan-400"
					onClick={e => handleUpdate(chNo)}
				/>
			)
		else
			return (
				<BiCheck
					className="cursor-pointer  hover:text-cyan-400"
					onClick={e => handleUpdate(chNo)}
				/>
			)
	}
	if (!course && isLoading) return <Loading />

	if (!course && !isLoading)
		return <h1 className="text-2xl text-center">Oops! Course Not found</h1>
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
				<h1 className="text-3xl font-head">
					{edit.course ? (
						<input
							className="bg-blue-900 h-8 my-auto px-2 w-min pb-1 rounded-sm"
							onChange={e =>
								setChange({
									...change,
									course: {
										...change.course,
										name: e.target.value,
									},
								})
							}
							value={change.course.name}
						/>
					) : change.course ? (
						change.course.name
					) : (
						course.course.name
					)}
				</h1>
				<div className="flex gap-2">
					<BiEdit
						className="text-2xl leading-5 cursor-pointer hover:text-yellow-500"
						onClick={e => clickEdit(0)}
					/>
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

			<div
				className={`course-prop ${
					course.course.completed ? "bg-green-800" : "bg-red-800"
				} py-4 px-8 rounded-md w-fit font-body`}
			>
				<li>
					<BiCategory />
					{edit.course ? (
						<input
							onChange={e =>
								setChange({
									...change,
									course: {
										...change.course,
										category: e.target.value,
									},
								})
							}
							value={change.course.category}
							className="bg-blue-900 h-8 my-auto px-2 w-24 rounded-"
						/>
					) : change.course ? (
						change.course.category
					) : (
						course.course.category
					)}
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
					{course.course.completed ? (
						<>
							<BiTrophy /> Completed
						</>
					) : (
						<>
							<BiLoader /> In Progress
						</>
					)}
				</li>
			</div>
			<h2 className="text-2xl font-bold mt-4 font-head underline">
				Chapters
			</h2>
			<div className="flex flex-col">
				<div className="overflow-x-auto sm:-mx-6 lg:-mx-8 ">
					<div className="py-2 inline-block lg:w-4/5 sm:pl-6 lg:pl-8">
						<div className="overflow-hidden rounded-md">
							<table className="min-w-full ">
								<thead className="border-b bg-slate-800 font-sm font-head">
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
													className={`${
														chapter.completed
															? "bg-green-900 line-through"
															: "bg-gray-800"
													} hover:bg-yellow-600 border-b font-body text-white text-left text-lg transition-all ease-in duration-500`}
												>
													<td className="px-6 py-4 ">
														{chapter.chNo}
													</td>
													<td className="px-6 py-4 ">
														{edit.ch ==
														chapter.chNo ? (
															<input
																className="bg-gray-700 rounded-sm px-1"
																value={
																	change
																		.chapters[
																		chapter
																			.chNo
																	].title
																}
																onChange={e =>
																	setChange({
																		...change,
																		chapters:
																			{
																				...change.chapters,
																				[chapter.chNo]:
																					{
																						...change
																							.chapters[
																							chapter
																								.chNo
																						],
																						title: e
																							.target
																							.value,
																					},
																			},
																	})
																}
															/>
														) : change.chapters[
																chapter.chNo
														  ] ? (
															change.chapters[
																chapter.chNo
															].title
														) : (
															chapter.title
														)}
													</td>
													<td className="py-4 whitespace-nowrap">
														{edit.ch ==
														chapter.chNo ? (
															<input
																className="bg-gray-700 w-min rounded-sm px-1"
																value={
																	change
																		.chapters[
																		chapter
																			.chNo
																	].remarks
																}
																onChange={e =>
																	setChange({
																		...change,
																		chapters:
																			{
																				...change.chapters,
																				[chapter.chNo]:
																					{
																						...change
																							.chapters[
																							chapter
																								.chNo
																						],
																						remarks:
																							e
																								.target
																								.value,
																					},
																			},
																	})
																}
															/>
														) : change.chapters[
																chapter.chNo
														  ] ? (
															change.chapters[
																chapter.chNo
															].remarks
														) : (
															chapter.remarks
														)}
													</td>
													<td className="py-4 px-4 whitespace-nowrap flex gap-2 text-2xl">
														{edit.ch !=
															chapter.chNo && (
															<UpdateIc
																chNo={
																	chapter.chNo
																}
															/>
														)}
														<BiEditAlt
															className="cursor-pointer hover:text-yellow-500"
															onClick={e =>
																clickEdit(
																	chapter.chNo
																)
															}
														/>
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
			{(change.course || Object.keys(change.chapters).length > 0) && (
				<div className="absolute bg-slate-900 p-3 rounded-md bottom-5 left-1/2">
					Changes Made!
					<button
						className="bg-yellow-700 rounded-md p-1 ml-2"
						onClick={handleSave}
					>
						Save Changes
					</button>
				</div>
			)}
		</div>
	)
}

export default Course

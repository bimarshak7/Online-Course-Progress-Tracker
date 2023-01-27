import { useState } from "react"
import { useDispatch } from "react-redux"
import { BsPlusCircleFill } from "react-icons/bs"

import { FormText, Popup } from "."
import { setAlert } from "../redux/actions/misc"
import { addCourse } from "../redux/actions/course"

const chS = { title: "", remarks: "" }

const initState = {
	name: "",
	category: "",
	chapters: [],
}

const CourseForm = ({ setShow }) => {
	const [prop, setProp] = useState(initState)

	const dispatch = useDispatch()

	const handleChange = e => {
		setProp({ ...prop, [e.target.name]: e.target.value })
	}

	const handleChapters = (e, idx) => {
		console.log(idx, e.target.name, e.target.value)
		let update = [...prop.chapters]
		update[idx][e.target.name] = e.target.value
		setProp({ ...prop, chapters: update })
	}

	const onSubmit = e => {
		console.log("Submitted", prop)
		const { name, category, chapters } = prop
		if (name && category && chapters) {
			dispatch(addCourse(prop))
			setShow(false)
			setProp(initState)
		} else {
			dispatch(setAlert("One or more field is missing!", "danger"))
		}
	}

	return (
		<Popup title={"Add new course"} setShow={setShow}>
			<FormText
				type="text"
				name="name"
				value={prop.name}
				labelText="Name of Course"
				handleChange={handleChange}
			/>
			<FormText
				type="text"
				name="category"
				value={prop.category}
				labelText="Course Category"
				placeholder="machine learning,frontend,backend,etc"
				handleChange={handleChange}
			/>
			<hr className="py-2" />
			<h2 className="text-center text-lg mb-2 font-semibold">
				Add Chapters
			</h2>
			<BsPlusCircleFill
				className="mx-auto my-1 text-xl"
				onClick={e =>
					setProp({
						...prop,
						chapters: [...prop.chapters, { ...chS }],
					})
				}
			/>

			{prop.chapters.map((chapter, idx) => {
				return (
					<div className="" key={idx}>
						<span className="font-bold">Chapter {idx + 1}</span>
						<div className="flex gap-2">
							<FormText
								type="text"
								name="title"
								value={chapter.title}
								labelText="Title"
								handleChange={e => handleChapters(e, idx)}
							/>
							<FormText
								type="text"
								name="remarks"
								value={chapter.remarks}
								labelText="Remarks"
								handleChange={e => handleChapters(e, idx)}
							/>
						</div>
						<hr className="mb-4" />
					</div>
				)
			})}
			<button
				className="flex button1 w-2/3 justify-center py-2"
				onClick={onSubmit}
			>
				Save
			</button>
		</Popup>
	)
}

export default CourseForm

import { useState } from "react"
import { useDispatch } from "react-redux"
import { BsPlusLg } from "react-icons/bs"

import { Popup, FormText } from "../Components"
import { addCourse } from "../redux/actions/cours"
import { setAlert } from "../redux/actions/misc"

const initState = {
	name: "",
	category: "",
	chapters: 1,
}

const Home = () => {
	const [show, setShow] = useState(false)
	const [prop, setProp] = useState(initState)
	const dispatch = useDispatch()

	const handleChange = e => {
		setProp({ ...prop, [e.target.name]: e.target.value })
	}

	const onSubmit = e => {
		console.log("Submitted")
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
		<div className="flex mx-4">
			<div className="w-1/4 border-r-2 border-red-900">jgrkj</div>
			<div className="w-3/4">
				<div
					onClick={e => setShow(true)}
					className="flex border border-red-800 text-white gap-2 my-4 mx-auto w-1/3 text-2xl bg-slate-900 py-2 rounded justify-center cursor-pointer"
				>
					<BsPlusLg className="ml-4 text-2xl my-auto" />
					<h2>Add new course</h2>
				</div>
				{show && (
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
							handleChange={handleChange}
						/>

						<FormText
							type="number"
							name="chapters"
							value={prop.chapters}
							labelText="No. of chapters"
							handleChange={handleChange}
						/>
						<button
							className="flex button1 w-2/3 justify-center py-2"
							onClick={onSubmit}
						>
							Save
						</button>
					</Popup>
				)}
			</div>
		</div>
	)
}

export default Home

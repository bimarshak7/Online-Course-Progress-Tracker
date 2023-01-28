import { useEffect } from "react"
import { useParams } from "react-router-dom"
import { useDispatch, useSelector } from "react-redux"

import { getSingleCourse } from "../redux/actions/course"

const Course = () => {
	const { id } = useParams()
	const course = useSelector(state => state.course.singleCourse)
	const dispatch = useDispatch()

	useEffect(() => {
		if (id) dispatch(getSingleCourse(id))
	}, [id])

	return <div>{course && <h1>{course.course.name}</h1>}</div>
}

export default Course

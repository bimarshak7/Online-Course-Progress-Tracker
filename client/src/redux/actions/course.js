import { createAsyncThunk } from "@reduxjs/toolkit"
import axios from "axios"

import { setAlert } from "./misc"
import { setLoading } from "../reducers/misc"

export const addCourse = createAsyncThunk(
	"course/add",
	async ({ name, category, chapters }, { dispatch }) => {
		console.log(chapters)
		const response = await axios
			.post(`/api/course/add`, {
				name: name,
				chapters: chapters,
				category: category,
			})
			.then(res => {
				dispatch(setAlert("New Course Added!", "success", true))
				return res.data
			})
			.catch(err => {
				// console.error(err.response.data.error)
				dispatch(setAlert(err.response.data.error, "danger", true))
			})

		if (!response) return { success: false }
		return { success: true, data: response }
	}
)

export const listCourses = createAsyncThunk(
	"course/list",
	async ({}, { dispatch }) => {
		dispatch(setLoading(true))
		const response = await axios
			.get(`/api/course/list`)
			.then(res => {
				dispatch(setLoading(false))
				return res.data
			})
			.catch(err => {
				console.error(err.response)
				dispatch(
					setAlert(
						err.response.data.error || "Error fetching data",
						"danger",
						true
					)
				)
			})

		if (!response) return { success: false }
		return { success: true, data: response.data }
	}
)

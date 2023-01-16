import { createAsyncThunk } from "@reduxjs/toolkit"
import axios from "axios"

import { setAlert } from "./misc"

export const addCourse = createAsyncThunk(
	"course/add",
	async ({ name, category, chapters }, { dispatch }) => {
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

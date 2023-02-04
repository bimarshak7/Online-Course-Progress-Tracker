import { createAsyncThunk } from "@reduxjs/toolkit"
import axios from "axios"

import { setAlert } from "./misc"
import { setLoading } from "../reducers/misc"

export const addCourse = createAsyncThunk(
	"course/add",
	async ({ name, category, chapters }, { dispatch }) => {
		console.log(name, category, chapters)
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

export const getSingleCourse = createAsyncThunk(
	"course/getSingleCOurse",
	async (id, { dispatch, getState }) => {
		if (getState().misc.isLoading) return

		dispatch(setLoading(true))
		const response = await axios
			.get(`/api/course/?id=${id}`)
			.then(res => {
				dispatch(setLoading(false))
				return res.data
			})
			.catch(err => {
				dispatch(setLoading(false))
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

export const deleteCourse = createAsyncThunk(
	"course/delete",
	async (params, { dispatch }) => {
		const response = await axios
			.delete(`/api/course`, { data: params })
			.then(res => {
				dispatch(setAlert(res.data.message, "success"))
				setTimeout(() => {
					if (params.chNo == 0) window.location.replace("/home")
				}, 2000)
				return res.data
			})
			.catch(err => {
				console.error(err.response)
				dispatch(
					setAlert(
						err.response.data.error || "Couldn't delete course.",
						"danger",
						true
					)
				)
			})
		if (!response) return { success: false }

		return { success: true, data: response }
	}
)

export const updateCourse = createAsyncThunk(
	"course/update",
	async ({ id, chNo }, { dispatch }) => {
		console.log(id, chNo)
		const response = await axios
			.put(`/api/track/?id=${id}`, { chNo: chNo })
			.then(res => {
				dispatch(setAlert(res.data.message, "success"))
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
		return { success: true, data: response, chNo: chNo }
	}
)

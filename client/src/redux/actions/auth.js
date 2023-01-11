import { createAsyncThunk } from "@reduxjs/toolkit"
import axios from "axios"

import { setAlert } from "./misc"

export const registerAc = createAsyncThunk(
	"auth/register",
	async ({ name, email, password1, password2 }, { dispatch }) => {
		const response = await axios
			.post(`/api/auth/register`, {
				name: name,
				email: email,
				password: password1,
			})
			.then(res => {
				dispatch(setAlert("Account created!", "success", true))
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

export const login = createAsyncThunk(
	"auth/login",
	async ({ email, password1 }, { dispatch }) => {
		const response = await axios
			.post(`/api/auth/login`, {
				email: email,
				password: password1,
			})
			.then(res => {
				dispatch(setAlert(res.data.message, "success", true))
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

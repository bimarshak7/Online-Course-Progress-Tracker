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
				dispatch(setAlert(res.data.message, "success"))
				return res.data
			})
			.catch(err => {
				console.error(err.response)
				dispatch(
					setAlert(
						err.response.data.error ||
							"Something Went Wrong ! Try again later",
						"danger",
						true
					)
				)
			})

		if (!response) return { isAuthenticated: false }
		return { isAuthenticated: true }
	}
)

export const verify = createAsyncThunk(
	"auth/verfiy",
	async (alert, { dispatch }) => {
		const response = await axios
			.get("/api/auth/verify", {
				withCredentials: true,
			})
			.then(res => {
				dispatch(setAlert(res.data.message ?? "Logged in", "success"))
				return res.data
			})
			.catch(err => {
				if (alert) {
					dispatch(
						setAlert(
							err.response?.data?.error ||
								"You must login to continue !",
							"danger"
						)
					)
				}
				return false
			})

		if (response) return { isAuthenticated: true, user: response.user }

		return { isAuthenticated: false, user: "" }
	}
)

export const logout = createAsyncThunk(
	"auth/logout",
	async ({}, { dispatch }) => {
		console.log("Logout action")
		const response = await axios
			.get("/api/auth/logout", {
				withCredentials: true,
			})
			.then(res => {
				dispatch(setAlert(res.data.message ?? "Logged Out!", "success"))
				return res.data
			})
			.catch(err => {
				if (alert) {
					dispatch(
						setAlert(
							err.response?.data?.error ||
								"Something went wrong !",
							"danger"
						)
					)
				}
				return false
			})

		return { isAuthenticated: false }
	}
)

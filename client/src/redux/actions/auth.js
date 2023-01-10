import { createAsyncThunk } from "@reduxjs/toolkit"
import axios from "axios"

import { setAlert } from "./misc"

export const registerAc = createAsyncThunk(
	"auth/login",
	async ({ name, email, password1, password2 }, { dispatch }) => {
		console.log("Here")
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
				console.error(err)
			})

		if (!response) return { success: false }
		return { success: true, data: response }
	}
)

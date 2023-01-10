import { createAsyncThunk } from "@reduxjs/toolkit"
import axios from "axios"

export const login = createAsyncThunk(
	"auth/login",
	async ({ email, password1 }, dispatch) => {
		const response = await axios
			.get(
				`/api/article/list?category=${cat}&page=${page}&items=${items}`,
				{
					withCredentials: true,
				}
			)
			.then(res => {
				return res.data
			})
			.catch(err => {
				console.error(err)
			})

		if (!response) return { success: false }
		return { success: true, data: response, page: page, cat: cat }
	}
)

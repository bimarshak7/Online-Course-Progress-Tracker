import { createSlice } from "@reduxjs/toolkit"

import { login, verify } from "../actions/auth"

const initialState = { verifying: false, isAuthenticated: false }

const authSlice = createSlice({
	name: "auth",
	initialState,
	reducers: {},
	extraReducers: builder => {
		builder.addCase(login.pending, state => {
			state.verifying = true
		})
		builder.addCase(login.fulfilled, (state, { payload }) => {
			state.isAuthenticated = payload.isAuthenticated
			state.verifying = false
		})
		builder.addCase(verify.pending, state => {
			state.verifying = true
		})
		builder.addCase(verify.fulfilled, (state, { payload }) => {
			console.log("lol")
			console.log("Hya pugyo ", payload)
			state.isAuthenticated = payload.isAuthenticated
			state.verifying = false
		})
	},
})

export default authSlice.reducer

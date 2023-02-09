import { createSlice } from "@reduxjs/toolkit"

import { login, verify, logout, getUser } from "../actions/auth"

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
			state.isAuthenticated = payload.isAuthenticated
			state.verifying = false
		})
		builder.addCase(logout.fulfilled, (state, { payload }) => {
			state.isAuthenticated = false
			state.verifying = false
			delete state.user
		})
		builder.addCase(getUser.fulfilled, (state, { payload }) => {
			state.user = payload.user
		})
	},
})

export default authSlice.reducer

import { createSlice } from "@reduxjs/toolkit"

import { listCourses } from "../actions/course"

const initialState = {}

const courseSlice = createSlice({
	name: "course",
	initialState,
	reducers: {},
	extraReducers: builder => {
		builder.addCase(listCourses.fulfilled, (state, { payload }) => {
			state.courses = payload.data
		})
	},
})

export default courseSlice.reducer

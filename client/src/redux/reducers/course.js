import { createSlice } from "@reduxjs/toolkit"

import { listCourses, getSingleCourse } from "../actions/course"

const initialState = {}

const courseSlice = createSlice({
	name: "course",
	initialState,
	reducers: {},
	extraReducers: builder => {
		builder.addCase(listCourses.fulfilled, (state, { payload }) => {
			state.courses = payload.data
		})
		builder.addCase(getSingleCourse.fulfilled, (state, { payload }) => {
			if (payload?.data) state.singleCourse = payload.data
		})
	},
})

export default courseSlice.reducer

import { createSlice } from "@reduxjs/toolkit"

import { listCourses, getSingleCourse, deleteCourse } from "../actions/course"

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
		builder.addCase(deleteCourse.fulfilled, (state, { payload }) => {
			console.log("Here ", payload, state)
			if (payload?.data?.chNo) {
				let chaptersUp = state.singleCourse.chapters.filter(
					chapter => chapter.chNo !== payload.data.chNo
				)
				console.log(chaptersUp)
				// state.singleCourse.chapters = chaptersUp
			}
		})
	},
})

export default courseSlice.reducer

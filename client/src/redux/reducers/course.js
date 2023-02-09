import { createSlice } from "@reduxjs/toolkit"

import {
	listCourses,
	getSingleCourse,
	deleteCourse,
	updateCourse,
	getreport,
} from "../actions/course"

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
			if (payload?.data?.chNo) {
				let chaptersUp = JSON.parse(
					JSON.stringify(state.singleCourse.chapters)
				).filter(chapter => chapter.chNo != payload.data.chNo)
				chaptersUp.forEach(element => {
					if (element.chNo > payload.data.chNo) element.chNo -= 1
				})
				state.singleCourse.chapters = chaptersUp
			}
		})
		builder.addCase(updateCourse.fulfilled, (state, { payload }) => {
			console.log(payload)
			state.singleCourse.course.completed = payload.data.congrats ? 1 : 0

			if (payload?.chNo != 0)
				state.singleCourse.chapters[payload.chNo - 1].completed =
					!state.singleCourse.chapters[payload.chNo - 1].completed
		})
		builder.addCase(getreport.fulfilled, (state, { payload }) => {
			state.report = payload.data
		})
	},
})

export default courseSlice.reducer

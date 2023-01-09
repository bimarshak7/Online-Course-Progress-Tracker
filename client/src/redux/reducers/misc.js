import { createSlice } from "@reduxjs/toolkit"

const initialState = {
	isLoading: false,
	showAlert: false,
	alertMsg: "",
	alertType: "",
}

const miscSlice = createSlice({
	name: "misc",
	initialState,
	reducers: {
		displayAlert: (state, { payload }) => {
			state.alertMsg = payload.alertMsg
			state.alertType = payload.alertType
			state.showAlert = true
		},
		clearAlert: state => {
			state.alertMsg = ""
			state.alertType = ""
			state.showAlert = false
		},
	},
})

export const { displayAlert, clearAlert } = miscSlice.actions
export default miscSlice.reducer

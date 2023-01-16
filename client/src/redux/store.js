import { configureStore } from "@reduxjs/toolkit"

import misc from "./reducers/misc"
import auth from "./reducers/auth"
import course from "./reducers/course"

export const store = configureStore({
	reducer: {
		misc: misc,
		auth: auth,
		course: course,
	},
})

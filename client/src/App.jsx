import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import { Provider } from "react-redux"
import { useSelector } from "react-redux"

import { Home, Login, Feed, Course } from "./Pages"
import { Alert, PrivateRoute, CourseList } from "./Components"
import "./App.css"

function App() {
	const misc = useSelector(state => state.misc)

	return (
		<Router>
			<div className="App">
				{misc.showAlert && <Alert />}

				<Routes>
					<Route path="/" element={<Login />} />
					<Route
						path="/register"
						element={<Login register={true} />}
					/>
					<Route
						path="/home"
						element={
							<PrivateRoute>
								<Home />
							</PrivateRoute>
						}
					>
						<Route path="" element={<CourseList />} />
						<Route path="/home/course/:id" element={<Course />} />
					</Route>
					<Route
						path="/feed"
						element={
							<PrivateRoute>
								<Feed />
							</PrivateRoute>
						}
					/>
				</Routes>
			</div>
		</Router>
	)
}

export default App

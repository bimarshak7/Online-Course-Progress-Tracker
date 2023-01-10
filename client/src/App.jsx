import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import { Provider } from "react-redux"
import { useSelector } from "react-redux"

import { store } from "./redux/store"
import { Home, Login } from "./Pages"
import { Alert } from "./Components"
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
					<Route path="/home" element={<Home />} />
				</Routes>
			</div>
		</Router>
	)
}

export default App

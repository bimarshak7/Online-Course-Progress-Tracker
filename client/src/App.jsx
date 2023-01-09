import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import { Login } from "./Pages"
import "./App.css"

function App() {
	return (
		<Router>
			<div className="App">
				<Routes>
					<Route path="/" element={<Login />} />
					<Route
						path="/register"
						element={<Login register={true} />}
					/>
				</Routes>
			</div>
		</Router>
	)
}

export default App

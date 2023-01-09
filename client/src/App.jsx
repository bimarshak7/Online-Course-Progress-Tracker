import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import { Provider } from "react-redux"

import { store } from "./redux/store"
import { Login } from "./Pages"
import "./App.css"

function App() {
	return (
		<Provider store={store}>
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
		</Provider>
	)
}

export default App

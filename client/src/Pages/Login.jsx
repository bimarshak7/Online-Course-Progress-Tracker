import { useState } from "react"

import { Logo, FormText } from "../Components"

const initialState = {
	username: "",
	password: "",
	bus_number: "",
}

const Login = () => {
	const [values, setValues] = useState(initialState)

	const handleChange = e => {
		setValues({ ...values, [e.target.name]: e.target.value })
	}

	return (
		<div className="center-xy">
			<div className="flex flex-col border-2 border-zinc-400 p-4 rounded-lg border-t-8 border-t-green-900">
				<div className="flex">
					<Logo />
					<div className="flex flex-col ml-4 gap-2">
						<h1 className="text-xl md:text-3xl">
							Online Course Progress Tracker
						</h1>
						<h1 className="text-2xl md:text-3xl text-center">
							Login
						</h1>
					</div>
				</div>
				<div className="form m-2"></div>
				<FormText
					type={"text"}
					name={"email"}
					value={values.email}
					labelText={"Email"}
					handleChange={handleChange}
				/>

				<FormText
					name="password"
					type="password"
					labelText="Password"
					value={values.password}
					handleChange={handleChange}
				/>
			</div>
		</div>
	)
}

export default Login

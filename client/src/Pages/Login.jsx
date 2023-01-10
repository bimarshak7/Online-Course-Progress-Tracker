import { useState } from "react"
import { Link } from "react-router-dom"
import { useDispatch, useSelector } from "react-redux"

import { Logo, FormText, Alert } from "../Components"
import { setAlert } from "../redux/actions/misc"
import { registerAc } from "../redux/actions/auth"

const initialState = {
	name: "",
	email: "",
	password1: "",
	password2: "",
}

const Login = ({ register }) => {
	const [values, setValues] = useState(initialState)
	const misc = useSelector(state => state.misc)
	const dispatch = useDispatch()

	const handleChange = e => {
		setValues({ ...values, [e.target.name]: e.target.value })
	}

	const onSubmit = e => {
		e.preventDefault()
		let { email, password1, password2, name } = values
		if (!email || !password1 || !(!register || (password2 && name))) {
			dispatch(setAlert("One or more field missing!!", "danger", true))
		}
		if (register) dispatch(registerAc(values))
	}
	return (
		<div className="center-xy">
			{misc.showAlert && <Alert />}
			<div className="box1">
				<div className="flex">
					<Logo />
					<div className="flex flex-col ml-4 md:gap-2">
						<h1 className="text-lg md:text-2xl font-semibold">
							Online Course Progress Tracker
						</h1>
						<h1 className="text-2xl md:text-3xl font-bold">
							{register ? "Register" : "Login"}
						</h1>
					</div>
				</div>
				<form onSubmit={onSubmit} className="flex flex-col mx-4 mt-4">
					{register && (
						<FormText
							name="name"
							type="text"
							labelText="Full Name"
							value={values.name}
							handleChange={handleChange}
						/>
					)}
					<FormText
						type={"email"}
						name={"email"}
						value={values.email}
						labelText={"Email"}
						handleChange={handleChange}
					/>

					<FormText
						name="password1"
						type="password"
						labelText="Password"
						value={values.password1}
						handleChange={handleChange}
					/>
					{register && (
						<FormText
							name="password2"
							type="password"
							labelText="Confirm Password"
							value={values.password2}
							handleChange={handleChange}
						/>
					)}
					<button className="button button1 bg-red-600" type="submit">
						{register ? "Register" : "Login"}
					</button>
				</form>
				<span className="mt-2 text-center">
					{register ? "Already have an account?" : "New here?"}
					<Link
						to={register ? "/" : "/register"}
						className="font-semibold"
					>
						{register ? " Login" : " Register"}
					</Link>
				</span>
			</div>
		</div>
	)
}

export default Login

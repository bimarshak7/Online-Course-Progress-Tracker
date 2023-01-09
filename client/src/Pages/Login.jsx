import { useState } from "react"
import { Link } from "react-router-dom"
import { useDispatch, useSelector } from "react-redux"

import { Logo, FormText, Alert } from "../Components"
import { displayAlert } from "../redux/reducers/misc"

const initialState = {
	email: "",
	password: "",
	password2: "",
}

const Login = ({ register }) => {
	const [values, setValues] = useState(initialState)
	const misc = useSelector(state => state.misc)
	const dispatch = useDispatch()

	const handleChange = e => {
		setValues({ ...values, [e.target.name]: e.target.value })
	}
	const onSubmit = () => {
		dispatch(
			displayAlert({ alertMsg: "Missing Field", alertType: "danger" })
		)
	}
	return (
		<div className="center-xy">
			{misc.showAlert && <Alert float={false} />}
			<div className="box1">
				<div className="flex">
					<Logo />
					<div className="flex flex-col ml-4 md:gap-2">
						<h1 className="text-lg md:text-2xl font-semibold leading-6">
							Online Course Progress Tracker
						</h1>
						<h1 className="text-2xl md:text-3xl font-bold">
							{register ? "Register" : "Login"}
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
				{register && (
					<FormText
						name="password2"
						type="password"
						labelText="Confirm Password"
						value={values.password2}
						handleChange={handleChange}
					/>
				)}
				<button className="button button1" onClick={onSubmit}>
					{register ? "Register" : "Login"}
				</button>

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

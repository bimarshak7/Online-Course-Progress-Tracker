import React, { useEffect } from "react"
import { Navigate } from "react-router-dom"
import { useDispatch, useSelector } from "react-redux"
import { verify } from "../redux/actions/auth"
import { setAlert } from "../redux/actions/misc"
import { Loading, NavBar } from "."

const PrivateRoute = ({ children }) => {
	const { isAuthenticated, verifying } = useSelector(state => state.auth)
	const dispatch = useDispatch()

	useEffect(() => {
		dispatch(verify(true))
	}, [isAuthenticated])

	if (verifying) {
		return <Loading />
	}
	if (!verifying && !isAuthenticated) {
		dispatch(setAlert("You must login to continue", "danger"))
		return <Navigate to="/" />
	}

	return (
		<>
			<NavBar />
			{children}
		</>
	)
}

export default PrivateRoute

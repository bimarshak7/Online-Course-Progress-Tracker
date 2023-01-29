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
		if (!isAuthenticated && !verifying) dispatch(verify(true))
	}, [isAuthenticated])

	if (verifying && !isAuthenticated) {
		return <Loading />
	}

	if (!verifying && !isAuthenticated) {
		setTimeout(() => {
			return <Navigate to="/" />
		}, 3000)
	}

	return (
		<>
			<NavBar />
			{children}
		</>
	)
}

export default PrivateRoute

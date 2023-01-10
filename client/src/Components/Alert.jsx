import React from "react"
import { useSelector, useDispatch } from "react-redux"
import { clearAlert, displayAlert } from "../redux/reducers/misc"

const Alert = () => {
	const { alertMsg, alertType } = useSelector(state => state.misc)
	const dispatch = useDispatch()
	return (
		<div className={`alert alert-${alertType}`} role="alert">
			<span
				className="cursor-pointer px-2 py-2 font-extrabold"
				onClick={e => {
					dispatch(clearAlert())
				}}
			>
				X
			</span>
			<span className="block sm:inline">{alertMsg}</span>
		</div>
	)
}

export default Alert

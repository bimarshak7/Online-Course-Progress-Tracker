import React from "react"
import { useSelector, useDispatch } from "react-redux"
import { clearAlert, displayAlert } from "../redux/reducers/misc"

const Alert = ({ float = true }) => {
	const { alertMsg, alertType } = useSelector(state => state.misc)
	const dispatch = useDispatch()
	return (
		<div className={`alert alert-${alertType}`} role="alert">
			<span
				className="absolute top-0 bottom-0 left-0 ml-4 cursor-pointer px-4 py-2"
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

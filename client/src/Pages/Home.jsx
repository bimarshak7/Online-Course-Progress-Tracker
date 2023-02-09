import { useEffect } from "react"
import { Outlet } from "react-router-dom"
import { useDispatch, useSelector } from "react-redux"

import { getUser } from "../redux/actions/auth"
const Home = () => {
	const user = useSelector(state => state.auth.user)
	const dispatch = useDispatch()

	useEffect(() => {
		dispatch(getUser(0))
	}, [])
	return (
		<div className="flex mx-4 gap-8 m-2">
			<div className="w-1/4 border-r-2 border-red-900">
				<div className="mt-8 ml-2 flex flex-col gap-2 mr-2">
					<span className="text-xl font-bold font-head">
						नमस्ते !
					</span>
					<div className="flex flex-col border-b-2 border-blue-700 pb-4 font-body">
						<span className="text-xl font-black indent-8 font-body">
							{user?.name}
						</span>
						<span className="text-lg font-bold indent-4">
							{user?.email}
						</span>
						<span className="font-bold indent-4">{user?.path}</span>
					</div>
					<div className="flex flex-col gap-2">
						<span className="flex mx-auto items-center justify-center rounded-full border-8 border-green-700 h-20 w-20 text-4xl">
							{user?.this_week}
						</span>
						<span className="mx-auto font-bold">
							Chapters Completed this week
						</span>
					</div>
				</div>
			</div>
			<div className="flex flex-col w-3/4 px-2 pt-4">
				<Outlet />
			</div>
		</div>
	)
}

export default Home

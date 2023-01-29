import { Outlet } from "react-router-dom"

const Home = () => {
	return (
		<div className="flex mx-4 gap-8 m-2">
			<div className="w-1/4 border-r-2 border-red-900">jgrkj</div>
			<div className="flex flex-col w-3/4 px-2 pt-4">
				<Outlet />
			</div>
		</div>
	)
}

export default Home

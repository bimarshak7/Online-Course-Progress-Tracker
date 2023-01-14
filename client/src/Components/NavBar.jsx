import { Logo } from "../Components"
import { AiFillCaretDown, AiOutlineSearch } from "react-icons/ai"
import { GiStairsGoal } from "react-icons/gi"
import { CgFeed } from "react-icons/cg"

const NavBar = () => {
	return (
		<div className="flex h-max bg-slate-900 lg:px-8 rounded py-2 mb-2">
			<div className="w-1/2 lg:1/3">
				<Logo small={true} />
			</div>
			<div className="flex gap-8 w-1/2 lg:1/3 p-2 text-4xl lg:text-4xl">
				<GiStairsGoal />
				<CgFeed />
			</div>
			<div className="flex gap-8 w-1/3 my-auto pr-4">
				<div className="flex rounded-lg bg-bg1 py-1">
					<AiOutlineSearch className="text-3xl pl-1" />
					<input
						className="bg-bg1 px-4 rounded-md outline-none"
						placeholder="Search Coursdo"
					/>
				</div>
				<AiFillCaretDown className="text-xl lg:text-2xl" />
			</div>
		</div>
	)
}

export default NavBar

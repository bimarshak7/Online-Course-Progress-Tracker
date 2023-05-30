import { Link } from "react-router-dom"
import smallLogo from "../assets/logoSmall.png"
import bigLogo from "../assets/logoFull.png"
const Logo = ({ small }) => {
	return (
		<Link to={"/"}>
			<img
				src={small ? smallLogo : bigLogo}
				className={`${small ? "w-40 h-10" : "h-16 mx-auto"} `}
			/>
		</Link>
	)
}

export default Logo

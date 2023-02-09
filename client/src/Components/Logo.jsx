import { Link } from "react-router-dom"

const Logo = ({ small }) => {
	return (
		<Link to={"/"}>
			<img
				src={
					small
						? "/src/assets/logoSmall.png"
						: "/src/assets/logoFull.png"
				}
				className={`${small ? "w-40 h-10" : "h-16 mx-auto"} `}
			/>
		</Link>
	)
}

export default Logo

import { Link } from "react-router-dom"

const Logo = () => {
	return (
		<Link to={"/"}>
			<img
				src="/src/assets/logo.png"
				className="h-20 w-20 md:h-24 md:w-24"
			/>
		</Link>
	)
}

export default Logo

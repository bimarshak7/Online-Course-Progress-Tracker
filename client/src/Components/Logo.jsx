import { Link } from "react-router-dom"

const Logo = () => {
	return (
		<Link to={"/"}>
			<img src="/src/assets/logo.png" className="h-24 w-24" />
		</Link>
	)
}

export default Logo

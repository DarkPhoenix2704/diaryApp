import "./Navbar.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { solid } from "@fortawesome/fontawesome-svg-core/import.macro";
import { useNavigate } from "react-router";

function Navbar() {
	const navigate = useNavigate();
	function Logout() {
		localStorage.removeItem("token");
		navigate("/login");   
	}

	return(
		<>
			<nav className="nav">
				<div className="navBrand">
					<FontAwesomeIcon icon={solid("book")} size="xl"className="headerIcon" />
            &nbsp;Diary App
				</div>
				<div className="navItems">
					<a className="btnLogout" onClick={Logout}>Logout</a>
				</div>
			</nav>
		</>
	);
}
export default Navbar;
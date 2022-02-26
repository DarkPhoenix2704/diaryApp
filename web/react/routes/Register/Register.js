import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { solid } from "@fortawesome/fontawesome-svg-core/import.macro";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { delay } from "../../utils/Util";

function Register() {
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [name, setName] = useState("");
	const navigate = useNavigate();
	async function handleRegister(event) {
		event.preventDefault();
		const response = await fetch("https://ec2-65-2-60-100.ap-south-1.compute.amazonaws.com:8080/api/register", {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify({
				name:name,
				email:email,
				password:password,
			}),
		});
		const data = await response.json();
		if (data.status === "ok") {
			toast.success("Successfully Registered");
			await delay(3000);
			window.location.href = "/";
		}else{
			toast.error(data.message);
		}
	}

	return (
		<>
			<div className="login-container">
				<div className="loginHeader">
					<FontAwesomeIcon icon={solid("book")} size="3x"className="headerIcon" />
					<h2>Welcome</h2>
					<p>Create an account</p>
				</div>
				<div className="input-container">
					<FontAwesomeIcon icon={solid("user")} className="icon" />
					<input type="text" placeholder="Name" onChange={(e)=>setName(e.target.value)} />
				</div>
				<div className="input-container">
					<FontAwesomeIcon icon={solid("envelope")} className="icon" />
					<input type="email" placeholder="Email" onChange={(e)=>setEmail(e.target.value)} />
				</div>
				<div className="input-container">
					<FontAwesomeIcon icon={solid("lock")} className="icon" />
					<input type="password" placeholder="Password"onChange={(e)=>setPassword(e.target.value)} />
				</div>
				<button className="login-button" onClick={(event)=>{handleRegister(event);}}><FontAwesomeIcon icon={solid("arrow-right-to-bracket")} /> &nbsp; SignUp</button>
				<button className="login-button" onClick={()=>{navigate("/login");}}><FontAwesomeIcon icon={solid("arrow-right-to-bracket")} /> &nbsp; Login</button>
			</div>
			<ToastContainer />
		</>
	);
}
export default Register;

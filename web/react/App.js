import { BrowserRouter , Route, Routes, Outlet, Navigate } from "react-router-dom";
import Home from "./routes/Home/Home";
import Login from "./routes/Login/Login";
import Register from "./routes/Register/Register";

const PrivateRoute = () => {
	const token = localStorage.getItem("token");
	if (token) {
		const user = JSON.parse(Buffer.from(token.split(".")[1], "base64").toString("ascii"));
		const { exp } = user;
		if (exp * 1000 < Date.now()) {
			return <Navigate to="/login" />;
		}else{
			return <Outlet/>;
		}
	}else{
		return <Navigate to="/login" />;
	}
};

export default function App() {
	return(
		<BrowserRouter>
			<Routes>
				<Route path="/" element={<PrivateRoute/>}>
					<Route path="/" element={<Home/>} />
				</Route>
				<Route path="/login" element={<Login/>} />
				<Route path="/register" element={<Register/>} />
			</Routes>
		</BrowserRouter>
	);
}
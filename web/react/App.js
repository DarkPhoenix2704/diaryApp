import { BrowserRouter , Route, Routes } from "react-router-dom";
import Home from "./routes/Home/Home";
import Login from "./routes/Login/Login";
import Register from "./routes/Register/Register";


export default function App() {
	return(
		<BrowserRouter>
			<Routes>
				<Route path="/" element={<Home/>} />
				<Route path="/login" element={<Login/>} />
				<Route path="/register" element={<Register/>} />
			</Routes>
		</BrowserRouter>
	);
}
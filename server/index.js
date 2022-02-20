import express from "express";
import mongoose from "mongoose";
import { addUser, findUser, addDiary, findDiary } from "./database/database.js";
import bcryptjs from "bcryptjs";
import JWT from "jsonwebtoken";
import cors from "cors";
import { config } from "dotenv";
const app = express();
config();
app.use(cors());
app.use(express.json());

mongoose.connect(`mongodb://${process.env.DB_HOST}:${process.env.DB_PORT}/${process.env.DB_NAME}`, {
	useNewUrlParser: true,
	useUnifiedTopology: true	
});

app.post("/api/register",async (req, res) => {
	const {name, email, password} = req.body;
	const hashedPasswd = await bcryptjs.hash(password, 10);
	const response = await addUser(name, email, hashedPasswd);
	res.json(response);
});

app.post("/api/login", async (req, res) => {
	const { email, password } = req.body;
	const user = await findUser(email);
	if (user) {
		const isMatch = await bcryptjs.compare(password, user.password);
		if (isMatch) {
			const token = JWT.sign({ name:user.name, email:email }, process.env.JWT_TOKEN_SECRET, {
				expiresIn: process.env.JWT_TOKEN_EXPIRES_IN
			});
			res.json({
				status: "ok",
				message: "Logged In",
				authToken: token
			});
		} else {
			res.json({
				status: "error",
				message: "Invalid Password"
			});
		}
	}else {
		res.json({
			status: "error",
			message: "Invalid Email"
		});
	}
});
app.post("/api/diary", async (req, res) => {
	try{
		const token = req.headers["x-access-token"];
		const decoded = await JWT.verify(token, process.env.JWT_TOKEN_SECRET);
		const email = decoded.email;
		const { date, diaryContent } = req.body;
		const response = await addDiary(email, { date, diaryContent });
		res.json(response);
	}catch(err){
		res.json({
			status: "error",
			message: "Invalid Token"
		});
	}
});

app.get("/api/diary", async (req, res) => {
	try{
		const token = req.headers["x-access-token"];
		const decoded = await JWT.verify(token, process.env.JWT_TOKEN_SECRET);
		const email = decoded.email;
		const response = await findDiary(email);
		res.json(response);
	}catch(err){
		res.json({
			status: "error",
			message: "Invalid Token"
		});
	}
});
app.listen(8080, () => {
	console.log("API active 8080");
});
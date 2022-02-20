import express from "express";

const app = express();
app.get("/", (req, res) => {
	console.log(req.body);
	console.log("Hello World!");
	res.send("Hello World!");
});
app.listen(8080, () => {
	console.log("Server started on port 8080");
});
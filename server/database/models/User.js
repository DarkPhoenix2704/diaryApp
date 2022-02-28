import mongoose from "mongoose";

const User = new mongoose.Schema({
	_id: {type: String, required: true, unique: true, primaryKey: true},
	name: {type: String, required: true},
	password: {type: String, required: true},
	diary: [{
		_id: {type: String, required: true, primaryKey: true},
		content: {type: String, required: false}
	}],
});
const UserModel =  mongoose.model("User", User);
export default UserModel;
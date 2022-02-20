import UserModel from "./models/User.js";

const addUser = async (name, email, password) => {
	try {
		new UserModel({
			name,
			email,
			password
		}).save();
		return {status:"ok", message: "User Created"};
	} catch (error) {
		return {status:"error", message: "Account already exists"};
	}
};

const findUser = async (email) => {
	try{
		const user = await UserModel.findOne({email});
		return user;
	}catch{
		return null;
	}
};
export {addUser, findUser};
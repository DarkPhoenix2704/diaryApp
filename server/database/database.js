import UserModel from "./models/User.js";

const addUser = async (name, email, password) => {
	try {
		const user = await UserModel.findById({_id:email});
		if(user){
			return {status:"error", message: "Account already exists"};
		}else{
			new UserModel({
				_id:email,
				name:name,
				password:password,
				diary: []
			}).save();
			return {status:"ok", message: "User Created"};
		}
	} catch (error) {
		return {status:"error", message: "Error Occurred"};
	}
};

const findUser = async (email) => {
	try{
		const user = await UserModel.findById({_id:email});
		return user;
	}catch{
		return null;
	}
};
const addDiary = async (email, {date, diaryContent}) => {
	try {
		const user = await UserModel.findById({_id:email});
		let userDiary;
		let found = false;
		if (user.diary.length !== 0 ) {
			userDiary = [];
			userDiary = user.diary.map(diary => {
				if(diary._id === date){
					found = true;
					return {_id:date, content:diaryContent};
				}
				return diary;
			});
			if(!found){
				userDiary.push({_id:date, content:diaryContent});
			}
		} else {
			userDiary = [{_id:date, content:diaryContent}];
		}
		user.diary = userDiary;
		UserModel.replaceOne({_id:email}, user, (err) => {
			if (err) {
				console.log(err);
				return {status:"error", message: "Error"};
			}else{
				return {status:"ok", message: "Diary Added"};
			}
		});
	} catch (error) {
		console.log(error);
		return {status:"error", message: "Unknown Error"};
	}
};
const findDiary = async (email, date) => {
	try{
		const user = await UserModel.findById({_id:email});
		let userDiary;
		user.diary.forEach(diary => {
			if(diary._id === date){
				userDiary = diary;
			}
		});
		if(userDiary){
			return {status:"ok", message: "Diary Found", diary:userDiary};
		}
		return {status:"error", message: "Diary Not Found"};
	}
	catch{
		return {status:"error", message: "Unknown Error"};
	}
};
export {addUser, findUser, addDiary, findDiary};
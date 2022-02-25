import { merge } from "webpack-merge";
import common from "./webpack.common.mjs";
import webpackDev from "./webpack.dev.mjs";
import webpackProd from "./webpack.prod.mjs";

export default (envVars) =>{
	const { env } = envVars;
	let envConfig;
	if(env === "dev"){
		envConfig = webpackDev;
	}else if(env === "prod"){
		envConfig = webpackProd;
	}
	return merge(common(), envConfig);
};
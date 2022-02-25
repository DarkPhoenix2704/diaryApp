import { CleanWebpackPlugin } from "clean-webpack-plugin";
import CssMinimizerPlugin from "css-minimizer-webpack-plugin";
import TerserPlugin from "terser-webpack-plugin";

export default () => ({
	mode: "production",
	devtool: "source-map",
	plugins: [
		new CleanWebpackPlugin(),
	],
	optimization:{
		minimizer:[
			new TerserPlugin(),
			new CssMinimizerPlugin(),
		],
		splitChunks: {
			chunks: "all",
		},
	}
});
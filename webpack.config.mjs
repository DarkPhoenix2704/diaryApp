import path from "path";
import HtmlWebpackPlugin from "html-webpack-plugin";
import { fileURLToPath } from "url";
import sharp from "responsive-loader";
import { CleanWebpackPlugin } from "clean-webpack-plugin";
import MiniCssExtractPlugin from "mini-css-extract-plugin";
import CssMinimizerPlugin from "css-minimizer-webpack-plugin";

import TerserPlugin from "terser-webpack-plugin";
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const buildPath = path.resolve(__dirname, "./build");

export default () => ({
	entry: path.resolve(__dirname, "./web/react/index.js"),
	resolve: {
		extensions: [ ".js", ".jsx", ".ts", ".tsx" ]
	},
	devServer:{
		port:3000,
		open:true,
		historyApiFallback:true,
		watchFiles:["./web/**/**/**/**/*.{js,jsx,ts,tsx,css}"]
	},
	output: {
		path: buildPath,
		filename: "bundle.[contenthash].js",
	},
	module: {
		rules: [
			{
				test: /\.(ts|js)x?$/,
				exclude: /node_modules/,
				use: [
					{
						loader: "babel-loader",
						options: {
							include: path.resolve(__dirname, "..", "./web")
						}
					},
				],
			},
			{
				test: /\.html$/,
				use: [
					{
						loader: "html-loader"
					}
				]
			},
			{
				test: /\.(jpe?g|png|webp)$/i,
				use: [
					{
						loader: "responsive-loader",
						options: {
							adapter: sharp
						},
					},
				],
			},
			{
				test: /\.css$/,
				use: [MiniCssExtractPlugin.loader, "css-loader"],
			},
			{
				test: /\.(?:ico|gif)$/i,
				type: "asset/resource",
			},
			{
				test: /\.(woff(2)?|eot|ttf|otf|svg|)$/,
				type: "asset/inline",
			},
		]
	},
	optimization:{
		minimizer:[
			new TerserPlugin(),
			new CssMinimizerPlugin(),
			new HtmlWebpackPlugin({
				template: path.resolve(__dirname, "./web/index.html"),
				title: "DiaryApp",
				favicon: path.resolve(__dirname, "./web/assets/favicon.ico"),
				minify: {
					removeAttributeQuotes: true,
					collapseWhitespace: true,
					removeComments: true
				}
			}),
		],
		splitChunks: {
			chunks: "all",
		},
	},
	plugins:[
		new CleanWebpackPlugin(),
		new MiniCssExtractPlugin({filename: "bundle.[contenthash].css"}),
	]
});
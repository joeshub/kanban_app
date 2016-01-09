var path = require('path');
var webpack = require('webpack');
var merge = require('webpack-merge');
var HtmlwebpackPlugin = require('html-webpack-plugin');

const TARGET = process.env.npm_lifecycle_event;

const PATHS = {
	app: path.join(__dirname, 'app'),
	build: path.join(__dirname, 'build')
};

// module.exports = {
const common = {
	// Entry accepts a path or an object of entries
	// the build chapter has examples of latter
	entry: PATHS.app,
	output: {
		path: PATHS.build,
		filename: 'bundle.js'
	},
	resolve: {
		// evaluated left to right
		extensions: ['', '.js', '.jsx']
	},
	module: {
		preLoaders: [
			{
				test: /\.jsx?$/,
				loaders: ['eslint'],
				include: PATHS.app
			}
		],
		loaders: [
			{
				test: /\.jsx?$/,
				loaders: ['babel'],
				include: PATHS.app
			},
			{
				// Test expects a regexp
				test: /\.css$/,
				// loaders are evaluated from right to left
				loaders: ['style', 'css'],
				// Include accepts either a path or an array of paths
				include: PATHS.app
			}
		]
	},
	plugins: [
		new HtmlwebpackPlugin({
			title: 'Kanban app page'
		})
	]
};

if(TARGET === 'start' || !TARGET) {
	module.exports = merge(common, {
		devtool: 'eval-source-map',
		devServer: {
			historyApiFallback: true,
			hot: true,
			inline: true,
			progress: true,

			// Display only errors to reduce output
			stats: 'errors-only',

			// Parse host:port from env
			host: process.env.HOST || '0.0.0.0',
			port: process.env.PORT || 3333
		},
		plugins: [
			new webpack.HotModuleReplacementPlugin()
		]
	});
}

if(TARGET === 'build') {
	module.exports = merge(common, {});
}

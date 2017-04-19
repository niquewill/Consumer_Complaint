module.exports = {
	entry: './src/App.js',
	target: 'node',
	output: {
		path: __dirname,
		filename: 'bundle.js'
	},
	module: {
		loader: [{
			test:/\.jsx?$/,
			exclude: /node_modules/,
			loader:'babel',
			query: {
				presets: ['es2015', 'react']
			}
		}]
	}
};
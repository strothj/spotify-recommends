module.exports = {
  entry: ['babel-polyfill', './src/main.js'],
  output: {
    path: './bin',
    filename: 'main.bundle.js',
  },
  module: {
    rules: [{
      test: /\.js$/,
      exclude: /node_modules/,
      loader: 'babel-loader',
    }],
  },
  devtool: 'cheap-module-source-map',
};

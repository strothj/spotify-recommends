const CopyWebpackPlugin = require('copy-webpack-plugin');

module.exports = {
  entry: ['babel-regenerator-runtime', './src/main.js'],
  output: {
    path: './bin',
    filename: 'main.bundle.js',
  },
  module: {
    loaders: [{
      test: /\.js$/,
      exclude: /node_modules/,
      loader: 'babel-loader',
    }],
  },
  plugins: [
    new CopyWebpackPlugin([{ from: 'public', to: 'public' }]),
  ],
};

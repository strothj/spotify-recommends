const CopyWebpackPlugin = require('copy-webpack-plugin');

const fs = require('fs');
var nodeModules = {};
fs.readdirSync('node_modules')
  .filter(function(x) {
    return ['.bin'].indexOf(x) === -1;
  })
  .forEach(function(mod) {
    nodeModules[mod] = 'commonjs ' + mod;
  });

module.exports = {
  entry: ['babel-regenerator-runtime', './src/main.js'],
  target: 'node',
  externals: nodeModules,
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

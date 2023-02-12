const path = require('path');

module.exports = {
  devtool: "source-map",
  entry: './build/index.js',
  output: {
    filename: 'index.js',
    path: path.resolve(__dirname, 'dist')
  }
};
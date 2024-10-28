const HtmlWebpackPlugin = require('html-webpack-plugin');
const path = require('path');

module.exports = {
  mode: "development",
  entry: path.resolve(__dirname, 'client', 'index.jsx'),
  output: {
    filename: "bundle.js",
    path: path.resolve(__dirname, 'client', 'dist')
  },
  plugins: [new HtmlWebpackPlugin()],
  watch: true,
  module: {
    rules: [
      {
        test: /\.(jsx|js)$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
          options: {
            presets: ['@babel/preset-env', '@babel/preset-react']
          }

        }
      }
    ]
  }
}
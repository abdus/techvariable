const path = require("path");
const htmlWebpackPlugin = require("html-webpack-plugin");

module.exports = {
  mode: "development",

  entry: "./src/index.js",
  output: {
    path: path.resolve(__dirname, "build/"),
    filename: "[name].js",
    publicPath: ".",
  },

  devServer: {
    port: 2000,
  },

  plugins: [new htmlWebpackPlugin({ template: "public/index.html" })],

  module: {
    rules: [
      {
        test: /\.jsx?$/,
        use: ["babel-loader"],
        exclude: /node_modules/,
      },
    ],
  },
};

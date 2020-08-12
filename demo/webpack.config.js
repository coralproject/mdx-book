/* eslint-disable @typescript-eslint/no-var-requires */
var HtmlWebpackPlugin = require("html-webpack-plugin");
var TsconfigPathsPlugin = require("tsconfig-paths-webpack-plugin");
var path = require("path");

// This would normally be `@coralproject/mdx-book/loader`.
const mdxToolsLoader = path.join(__dirname, "../loader");

module.exports = {
  mode: process.env.NODE_ENV === "production" ? "production" : "development",
  entry: "./main",
  resolve: {
    extensions: [".js", ".ts", ".tsx"],
    plugins: [
      // Support `tsconfig.json` `path` setting.
      new TsconfigPathsPlugin({
        configFile: path.join(__dirname, "./tsconfig.json"),
        extensions: [".js", ".ts", ".tsx"],
      }),
    ],
  },
  output: {
    filename: "[name].bundle.js",
    path: path.resolve(__dirname, "dist"),
  },
  module: {
    rules: [
      {
        test: /\.css/,
        use: ["style-loader", "css-loader"],
      },
      {
        test: /\.(j|t)sx?/,
        use: ["babel-loader"],
      },
      {
        test: /\.mdx?$/,
        use: ["babel-loader", mdxToolsLoader],
      },
    ],
  },
  devServer: {
    publicPath: "/",
    contentBase: "./public",
    hot: true,
  },
  plugins: [new HtmlWebpackPlugin()],
};

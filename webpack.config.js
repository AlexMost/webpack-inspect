const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const CleanWebpackPlugin = require("clean-webpack-plugin");
const webpack = require("webpack");
const { basename } = require("./package.json");
const BASENAME = process.env.NODE_ENV === "production" ? basename : "/";

module.exports = () => {
  return {
    entry: "./frontend/entry.js",
    output: {
      path: path.resolve(__dirname, "dist"),
      filename: "[name].[chunkhash].js"
    },
    devtool: "inline-source-map",
    module: {
      rules: [
        {
          test: /\.(js|jsx)$/,
          exclude: /node_modules/,
          use: ["babel-loader"]
        }
      ]
    },
    devServer: {
      contentBase: "./dist",
      compress: false,
      historyApiFallback: true
    },
    resolve: {
      extensions: ["*", ".js", ".jsx"]
    },
    optimization: {
      runtimeChunk: "single",
      splitChunks: {
        cacheGroups: {
          vendor: {
            test: /[\\/]node_modules[\\/]/,
            name: "vendors",
            chunks: "all"
          }
        }
      }
    },
    plugins: [
      new CleanWebpackPlugin(["dist"]),
      new webpack.HashedModuleIdsPlugin(),
      new HtmlWebpackPlugin({
        title: "Webpack inspect"
      }),
      new HtmlWebpackPlugin({
        title: "Webpack inspect",
        filename: "inspect/index.html"
      }),
      new webpack.DefinePlugin({
        BASENAME: JSON.stringify(BASENAME)
      })
    ]
  };
};

const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const CleanWebpackPlugin = require("clean-webpack-plugin");
const webpack = require("webpack");
const { homepage } = require("./package.json");
const publicUrl = process.env.NODE_ENV === "productoin" ? homepage : "/";

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
      new webpack.DefinePlugin({
        PUBLIC_URL: JSON.stringify(publicUrl)
      })
    ]
  };
};

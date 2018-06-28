const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const CleanWebpackPlugin = require("clean-webpack-plugin");
const SWPrecacheWebpackPlugin = require("sw-precache-webpack-plugin");
const CopyWebpackPlugin = require("copy-webpack-plugin");

const webpack = require("webpack");
const { basename, publicUrl, repositoryHome } = require("./package.json");
const isProd = process.env.NODE_ENV === "production";

const BASENAME = isProd ? basename : "/";
const PUBLIC_PATH = isProd ? publicUrl : "http://localhost:8080/";

module.exports = () => {
  return {
    entry: "./frontend/entry.js",
    output: {
      path: path.resolve(__dirname, "dist"),
      filename: "[name].[chunkhash].js",
      chunkFilename: "[name].[chunkhash].js"
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
        minChunks: 2,
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
        BASENAME: JSON.stringify(BASENAME),
        PUBLIC_PATH: JSON.stringify(PUBLIC_PATH),
        REPOSITORY_HOME: JSON.stringify(repositoryHome),
        "process.env.NODE_ENV": JSON.stringify(process.env.NODE_ENV)
      }),
      new SWPrecacheWebpackPlugin({
        cacheId: "webpack-inspect",
        dontCacheBustUrlsMatching: /\.\w{8}\./,
        filename: "service-worker.js",
        minify: isProd,
        navigateFallback: PUBLIC_PATH + "index.html",
        staticFileGlobsIgnorePatterns: [/\.map$/, /asset-manifest\.json$/]
      }),
      new CopyWebpackPlugin(["./CNAME", "./favicon.ico"])
    ]
  };
};

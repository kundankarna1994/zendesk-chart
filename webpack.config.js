const path = require("path");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const CopyWebpackPlugin = require("copy-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const TranslationsPlugin = require("./webpack/translations-plugin");

const externalAssets = {
  js: ["https://assets.zendesk.com/apps/sdk/2.0/zaf_sdk.js"],
};

module.exports = {
  entry: {
    nav_bar: ["./src/javascripts/locations/nav_bar.js"],
    background: ["./src/javascripts/locations/background.js"],
  },
  externals: {
    zendesk_app_framework_sdk: "ZAFClient",
  },
  output: {
    filename: "[name].js",
    path: path.resolve(__dirname, "dist/assets"),
    clean: true,
    assetModuleFilename: "[name][ext]",
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: "babel-loader",
        options: {
          presets: ["@babel/preset-env", "@babel/preset-react"],
        },
      },
      {
        type: "javascript/auto",
        test: /\.json$/,
        include: path.resolve(__dirname, "./src/translations"),
        use: "./webpack/translations-loader",
      },
      {
        test: /\.(sa|sc|c)ss$/,
        use: [
          MiniCssExtractPlugin.loader,
          { loader: "css-loader", options: { url: false } },
          "postcss-loader",
        ],
      },
    ],
  },

  plugins: [
    // Empties the dist folder
    new CleanWebpackPlugin({
      verbose: true,
      cleanOnceBeforeBuildPatterns: [path.join(process.cwd(), "dist/**/*")],
    }),

    // Copy over static assets
    new CopyWebpackPlugin({
      patterns: [
        { from: "src/manifest.json", to: "../[name][ext]" },
        { from: "src/images/*", to: "./[name][ext]" },
      ],
    }),

    new MiniCssExtractPlugin({
      filename: "[name].css",
    }),

    new TranslationsPlugin({
      path: path.resolve(__dirname, "./src/translations"),
    }),

    new HtmlWebpackPlugin({
      template: "./src/templates/iframe.html",
      filename: "nav_bar.html",
      hash: true,
      inject: "body",
      chunks: ["nav_bar"],
    }),
    new HtmlWebpackPlugin({
      template: "./src/templates/iframe.html",
      filename: "background.html",
      hash: true,
      inject: "body",
      chunks: ["background"],
    }),
  ],
};

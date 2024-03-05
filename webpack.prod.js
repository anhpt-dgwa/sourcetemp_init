const webpack = require("webpack");

module.exports = {
  mode: "production",
  entry: {
    app: ["./src/scripts/assets/js/app_webpack.js"],
  },
  output: {
    filename: "assets/js/[name].min.js",
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
        },
      },
    ],
  },
  plugins: [
    new webpack.optimize.LimitChunkCountPlugin({
      maxChunks: 1,
    }),
  ],
  target: ["web", "es5"],
};

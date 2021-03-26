const path = require('path');
const CopyPlugin = require("copy-webpack-plugin");
const fs = require("fs");

module.exports = {
  target: 'web',
  entry: {
    main: "./src/main.ts",
    configuration: "./src/configuration.ts"
  },
  resolve: {
    extensions: ["*", ".webpack.js", ".web.js", ".ts", ".tsx", ".js"],
    modules: [path.resolve("./src"), "node_modules"],
  },
  externals: [
    /^VSS\/.*/, /^TFS\/.*/, /^q$/
  ],
  output: {
    filename: "[name].js",
    libraryTarget: "amd",
  },
  devServer: {
    https: true,
    port: 3000,
    contentBase: path.join(__dirname, 'dist')
  },
  module: {
    rules: [
      {
        test: /\.ts?$/,
        use: "ts-loader"
      },
      {
        test: /\.html$/,
        use: "file-loader"
      }
    ]
  },
  plugins: [
    new CopyPlugin({
      patterns: [
        {from: "./node_modules/vss-web-extension-sdk/lib/VSS.SDK.min.js", to: "lib/VSS.SDK.min.js"},
        {from: "**/*.html", context: "static"}
      ]
    })
  ]
};

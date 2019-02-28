const path = require("path");

module.exports = {
  publicPath: './',
  filenameHashing: false,
  pluginOptions: {
    "style-resources-loader": {
      preProcessor: "scss",
      patterns: [path.resolve(__dirname, "./src/styles/style.scss")]
    }
  }
};

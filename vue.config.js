const path = require("path");

module.exports = {
  configureWebpack: {
    resolve: {
      alias: {
        "@": path.resolve("src"),
      },
    },
  },
  css: {
    loaderOptions: {
      sass: {
        prependData: `@import "@/styles/app.scss";`,
      },
    },
  },
};

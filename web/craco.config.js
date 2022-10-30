const NodePolyfillPlugin = require("node-polyfill-webpack-plugin");

module.exports = {
  webpack: {
    configure: (webpackConfig, { paths }) => {
      // ModuleScope Plugin
      const scopePluginIndex = webpackConfig.resolve.plugins.findIndex(
        ({ constructor }) => constructor && constructor.name === "ModuleScopePlugin"
      );

      webpackConfig.resolve.plugins.splice(scopePluginIndex, 1);

      return webpackConfig;
    },
    plugins: {
      add: [
        new NodePolyfillPlugin({
          excludeAliases: ["console"]
        }),
      ]
    }
  },
  style: {
    postOptions: {
      plugins: [
        require("tailwindcss"),
        require("autoprefixer")
      ]
    }
  },
  typescript: {
    enableTypeChecking: true
  }
};
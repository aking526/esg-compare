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
    plugins: {}
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
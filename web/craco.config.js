const fs = require("fs");

const NodePolyfillPlugin = require("node-polyfill-webpack-plugin");
const evalSourceMap = require("react-dev-utils/evalSourceMapMiddleware");
const redirectServerPath = require("react-dev-utils/redirectServedPathMiddleware");
const noopServiceWorker = require("react-dev-utils/noopServiceWorkerMiddleware");

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
  // DeprecationWarning: 'onAfterSetupMiddleware'
  devServer: (devServerConfig, { env, paths }) => {
    devServerConfig = {
      onBeforeSetupMiddleware: undefined,
      onAfterSetupMiddleware: undefined,
      setupMiddlewares: (middlewares, devServer) => {
        if (!devServer) {
          throw new Error("webpack-dev-server is not defined");
        }
        if (fs.existsSync(paths.proxySetup)) {
          require(paths.proxySetup)(devServer.app);
        }
        middlewares.push(
          evalSourceMap(devServer),
          redirectServerPath(paths.publicUrlOrPath),
          noopServiceWorker(paths.publicUrlOrPath)
        );
        return middlewares;
      }
    };

    return devServerConfig;
  },
  style: {
    postOptions: {
      plugins: [
        require("tailwindcss"),
        require("autoprefixer")
      ]
    }
  },
  typescript: {}
};
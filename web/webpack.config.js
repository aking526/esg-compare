const { createWebpackDevConfig } = require("@craco/craco");

const cracoConfig = require("./craco.config");
const webpackConfig = createWebpackDevConfig(cracoConfig);

module.exports = webpackConfig;
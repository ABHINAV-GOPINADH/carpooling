const { getDefaultConfig } = require("expo/metro-config");

module.exports = (async () => {
  const config = await getDefaultConfig(__dirname);

  config.resolver.extraNodeModules = {
    events: require.resolve("events"),
  };

  return config;
})();

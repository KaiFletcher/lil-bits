const webpack = require('webpack')
module.exports = function override(config, env) {
  config.resolve.fallback = {
    url: require.resolve('url'),
    assert: require.resolve('assert'),
    https: require.resolve('https'),
    buffer: require.resolve('buffer'),
    stream: require.resolve('stream'),
  }

  return config
}

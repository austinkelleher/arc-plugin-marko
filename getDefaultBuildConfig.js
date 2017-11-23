const path = require('path')

module.exports = function getDefaultBuildConfig (dir) {
  return {
    cacheDir: path.join(dir, '/cache'),
    outputDir: path.join(dir, '/static'),
    cacheProfile: 'production',
    cacheKey: 'production',
    bundlingEnabled: true,
    minify: true,
    fingerprintsEnabled: true
  }
}

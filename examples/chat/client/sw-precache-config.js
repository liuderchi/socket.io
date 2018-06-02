module.exports = {
  swFilePath: './build/service-worker.js',
  cacheId: 'sw-precache-webpack-plugin',
  dontCacheBustUrlsMatching: /\.\w{8}\./,
  navigateFallback: '/index.html',
  navigateFallbackWhitelist: [/^(?!\/__).*/],
  staticFileGlobsIgnorePatterns: [/\.map$/, /asset-manifest\.json$/],
  staticFileGlobs: [
    './build/**/**.html',
    './build/static/js/*.js',
    './build/static/css/*.css',
  ],
  stripPrefix: './build'
}

/* eslint-env node */

module.exports = {
  // Common to all envs below.
  presets: [],

  env: {
    // Used as the default for running babel
    development: {
      presets: [
        ['@babel/preset-env', {
          targets: {
            browsers: [
              'last 2 versions',
              'not IE < 11'
            ]
          }
        }]
      ]
    },
    // Jest runs with NODE_ENV=test and will use the following.
    // We target the current node version to minimize transcompilation.
    // This should speed up the test run and make it more debugable.
    test: {
      sourceMaps: 'both',
      presets: [
        ['@babel/preset-env', {
          targets: {
            node: 'current'
          }
        }]
      ]
    },
    // Default env used for webpack when e.g. running the dev server.
    // It will minimize transcompilation to target the
    // latest browsers. This should allow easier debugging.
    webpack: {
      sourceMaps: 'both',
      presets: [
        ['@babel/preset-env', {
          modules: false,
          useBuiltIns: 'usage',
          targets: {
            browsers: [
              'last 2 versions',
              'not IE < 11'
            ]
          }
        }]
      ]
    }
  }
};

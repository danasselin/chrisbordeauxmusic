module.exports = (config) => {
  const tests = 'app/tests/*test.+(js|jsx)';
  config.set({
    frameworks: ['mocha'],
    files: [
      {
        pattern: tests,
      },
    ],
    // Preprocess through webpack
    preprocessors: {
      [tests]: ['webpack'],
    },
    singleRun: true,
    webpack: { // kind of a copy of your webpack config
      externals: {
        "jsdom": "window",
        "cheerio": "window",
      },
      devtool: 'inline-source-map', // just do inline source maps instead of the default
      module: {
        loaders: [{
          test: /\.(js|jsx)$/,
          exclude: /\/node_modules\//,
          loader: 'babel-loader',
          query: {
            presets: ['airbnb'],
          },
        }],
      },
    },
  });
};

const postCssPlugins = [
  require('postcss-easy-import'),
  require('postcss-mixins'),
  require('postcss-for'),
  require('postcss-each'),
  require('postcss-conditionals'),
  require('postcss-color-function'),
  require('postcss-simple-vars'),
  require('postcss-extend'),
  require('autoprefixer'),
  require('precss'),
];

const baseLoaders = [
  {
    loader: 'css-loader',
  },
  {
    loader: 'postcss-loader',
    options: {
      plugins: postCssPlugins,
    },
  },
];

exports.devCssUse = ['style-loader'].concat(baseLoaders);

exports.prodCssUse = baseLoaders;


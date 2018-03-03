const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const HtmlWebpackExcludeAssetsPlugin = require('html-webpack-exclude-assets-plugin');
const WebpackShellPlugin = require('webpack-shell-plugin');
const merge = require('webpack-merge');
const parts = require('./webpack.parts');
const { devCssUse, prodCssUse } = require('./cssConfig');
const PATHS = require('./util');

require('dotenv').config();
const isDev = process.env.NODE_ENV === 'development';

const commonConfig = merge([
  {
    node: {
      fs: 'empty',
      net: 'empty',
      tls: 'empty',
    },
    entry: {
      app: PATHS.app,
      styles: PATHS.styles,
    },
    output: {
      path: PATHS.build,
      filename: '[name].js',
    },
    resolve: {
      extensions: ['.js', '.jsx', '.json'],
    },
    plugins: [
      new WebpackShellPlugin({
        onBuildStart: ['rm -rf build'],
      }),
      new HtmlWebpackPlugin({
        title: 'Chris Bordeaux Music',
        excludeAssets: [/styles.js/],
      }),
      new HtmlWebpackExcludeAssetsPlugin(),
    ],
  },
  parts.lintJavaScript({
    include: PATHS.app,
    options: {
      cacheDirectory: true,
    },
  }),
  parts.extractCSS({
    use: prodCssUse,
  }),
  parts.loadFonts({
    options: {
      name: 'fonts/[name].[ext]',
    },
  }),
  parts.loadJavaScript({
    include: PATHS.app,
    options: {
      cacheDirectory: true,
      plugins: [
        'babel-plugin-root-import',
        'transform-object-rest-spread',
      ],
    },
  }),
  
]);

const productionConfig = merge([
  parts.loadImages({
    options: {
      name: '[name].[ext]',
      outputPath: 'images/',
    },
  }),
  // parts.extractCSS({
  //   use: prodCssUse,
  // }),
  {
    plugins: [
      parts.setFreeVariable('process.env.NODE_ENV', 'production'),
      new CopyWebpackPlugin([{
        from: 'site_data/**',
        to: PATHS.build,
        ignore: 'film_scores.json',
        context: 'app/',
      }]),
    ],
  },
]);

const developmentConfig = merge([
  parts.devServer({
    host: process.env.HOST,
    port: process.env.PORT,
  }),
  parts.generateSourceMaps({
    type: 'cheap-module-eval-source-map',
  }),
  parts.loadImages(),
  // parts.loadCSS({
  //   use: devCssUse,
  // }),
]);


module.exports = (env) => {
  if (env === 'production') {
    return merge(commonConfig, productionConfig);
  }

  return merge(commonConfig, developmentConfig);
};

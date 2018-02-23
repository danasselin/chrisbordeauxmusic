const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const HtmlWebpackExcludeAssetsPlugin = require('html-webpack-exclude-assets-plugin');
const WebpackShellPlugin = require('webpack-shell-plugin');
const merge = require('webpack-merge');
const parts = require('./webpack.parts');
const { cssUse, prodCssUse } = require('./cssConfig');
require('dotenv').config();
const isDev = process.env.NODE_ENV === 'development';

const PATHS = {
  app: path.join(__dirname, '..', 'app'),
  build: path.join(__dirname, '..', 'build'),
  styles: path.join(__dirname, '..', 'app', 'css', 'main.css'),
};

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
      new HtmlWebpackPlugin({
        title: 'Chris Bordeaux Music',
        excludeAssets: [/styles.js/],
      }),
      new WebpackShellPlugin({
        onBuildStart: ['rm -rf build'],
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
  parts.extractCSS({
    use: prodCssUse,
  }),
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
  parts.loadCSS({
    use: cssUse,
  }),
]);


module.exports = (env) => {
  if (env === 'production') {
    return merge(commonConfig, productionConfig);
  }

  return merge(commonConfig, developmentConfig);
}

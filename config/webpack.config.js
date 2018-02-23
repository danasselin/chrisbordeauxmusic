const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const merge = require('webpack-merge');
const parts = require('./webpack.parts');
require('dotenv').config();
const isDev = process.env.NODE_ENV === 'development';

const PATHS = {
  app: path.join(__dirname, '..', 'app'),
  build: path.join(__dirname, '..', 'build'),
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
        title: 'Webpack demo',
      }),
    ],
  },
  parts.lintJavaScript({
    include: PATHS.app,
    options: {
      cacheDirectory: true,
    }
  }),
  parts.loadImages(),
  parts.loadFonts({
    options: {
      name: '[name].[ext]',
    },
  }),
  parts.loadCSS(),
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
      limit: 15000,
      name: '[name].[ext]',
    },
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
]);


module.exports = (env) => {
  if (env === 'production') {
    return merge(commonConfig, productionConfig);
  }

  return merge(commonConfig, developmentConfig);
}

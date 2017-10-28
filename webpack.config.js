const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const merge = require('webpack-merge');
const parts = require('./webpack.parts');
require('dotenv').config();

const PATHS = {
  app: path.join(__dirname, 'app'),
  build: path.join(__dirname, 'build')
};

const commonConfig = merge([
  {
    entry: {
      app: PATHS.app,
    },
    output: {
      path: PATHS.build,
      filename: '[name].js'
    },
    resolve: {
      extensions: ['.js', '.jsx']
    },
    plugins: [
      new HtmlWebpackPlugin({
        title: 'Webpack demo'
      }),
      parts.setFreeVariable(
        'process.env.DROPBOX_TOKEN',
        `${process.env.DROPBOX_TOKEN}`
      ),
      parts.setFreeVariable(
        'process.env.DROPBOX_SEC',
        `${process.env.DROPBOX_SEC}`
      ),
    ]
  },
  parts.lintJavaScript({
    include: PATHS.app,
    options: {
      cacheDirectory: true,
    }
  }),
  parts.loadCSS(),
  parts.loadJavaScript({
    include: PATHS.app,
    options: {
      cacheDirectory: true,
    }
  }),
]);

const productionConfig = merge([]);

const developmentConfig = merge([
  parts.devServer({
    host: process.env.HOST,
    port: process.env.PORT
  }),
  parts.generateSourceMaps({
    type: 'cheap-module-eval-source-map'
  }),
]);


module.exports = (env) => {
  if (env === 'production') {
    return merge(commonConfig, productionConfig);
  }

  return merge(commonConfig, developmentConfig);
}

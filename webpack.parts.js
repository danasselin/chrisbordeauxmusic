const ExtractTextPlugin = require('extract-text-webpack-plugin');
const webpack = require('webpack');

exports.generateSourceMaps = ({ type }) => ({
  devtool: type,
});

exports.setFreeVariable = ( key, value ) => {
  const env = {};
  env[key] = JSON.stringify(value);
  return new webpack.DefinePlugin(env);
};

exports.devServer = ({ host, port } = {}) => ({
  devServer: {
    historyApiFallback: true,
    stats: 'errors-only',
    host,
    port,
    overlay: {
      errors: false,
      warnings: false
    }
  }
});

exports.lintJavaScript = ({ include, exclude, options }) => ({
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        include,
        exclude,
        enforce: 'pre',
        loader: 'eslint-loader',
        options
      }
    ]
  }
});

exports.loadJavaScript = ({ include, exclude, options }) => ({
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        include,
        exclude,
        loader: 'babel-loader',
        options
      },
    ],
  },
});

exports.loadCSS = ({ include, exclude } = {}) => ({
  module: {
    rules: [
      {
        test: /\.css$/,
        include,
        exclude,
        use: [
          'style-loader',
          {
            loader: 'css-loader',
          },
          {
            loader: 'postcss-loader',
            options: {
              plugins: () => ([
                require('postcss-easy-import'),
                require('postcss-simple-vars'),
                require('postcss-extend'),
                require('autoprefixer'),
                require('precss'),
              ]),
            },
          }
        ]
      }
    ]
  }
});

exports.loadImages = ({ include, exclude, options } = {}) => (
  {
    module: {
      rules: [
        {
          test: /\.svg$/,
          use: 'raw-loader',
        }
      ]
    }
  }
)

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
      warnings: false,
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
        options,
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
        options,
      },
    ],
  },
});

exports.loadCSS = ({ include, exclude, use } = {}) => ({
  module: {
    rules: [
      {
        test: /\.css$/,
        include,
        exclude,
        use,
      },
    ],
  },
});

exports.extractCSS = ({ use }) => {
  const plugin = new ExtractTextPlugin({
    filename: '[name].css',
    allChunks: true,
  });

  return {
    module: {
      rules: [
        {
          test: /\.css$/,
          use: plugin.extract({
            fallback: 'style-loader',
            use,
          }),
        },
      ],
    },
    plugins: [plugin],
  };
};

exports.loadImages = ({ options } = {}) => (
  {
    module: {
      rules: [
        {
          test: /\.(png|jpg|svg)$/,
          use: {
            loader: 'file-loader',
            options,
          },
        },
      ],
    },
  }
);

exports.loadFonts = ({ include, exclude, options } = {}) => ({
  module: {
    rules: [
      {
        // Capture eot, ttf, woff, and woff2
        test: /\.(eot|ttf|woff|woff2)(\?v=\d+\.\d+\.\d+)?$/,
        include,
        exclude,
        use: {
          loader: 'file-loader',
          options,
        },
      },
    ],
  },
});

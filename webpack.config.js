var path = require('path')
var webpack = require('webpack')

module.exports = {
  devtool: 'cheap-module-eval-source-map',
  entry: [
    'webpack-hot-middleware/client',
    'babel-polyfill',
    './client/index',
  ],
  output: {
    path: path.join(__dirname, 'dist'),
    filename: 'bundle.js',
    publicPath: '/static/'
  },
  plugins: [
    new webpack.DefinePlugin({
      "process.env": {
        NODE_ENV: JSON.stringify("development")
      }
    }),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.optimize.OccurrenceOrderPlugin(),
    new webpack.NoErrorsPlugin(),
  ],

  module: {

    preLoaders: [
      {
        test: /\.js$/,
        loaders: ['eslint'],
        include: [
          path.resolve(__dirname, 'client')
        ],
      }
    ],

    loaders: [
      {
        test: /\.js$/,        
        include: [
          path.resolve(__dirname, 'client'),
        ],
        loaders: ['react-hot', 'babel-loader', 'babel'],
        plugins: ['transform-runtime', 'transform-decorators-legacy', 'syntax-dynamic-import'],
      },
      { test: /\.css$/, loader: "style-loader!css-loader" },
    ],

  },
}
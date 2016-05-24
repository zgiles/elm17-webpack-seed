var path = require('path');
var webpack = require('webpack');
var ROOT_PATH = path.resolve(__dirname);
var HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  entry: [
    'webpack-dev-server/client?http://localhost:3000',
    'webpack/hot/only-dev-server',
    path.resolve(ROOT_PATH, 'app')
  ],
  resolve: {
    extensions: ['', '.js', '.jsx', '.elm']
  },
  output: {
    path: path.resolve(ROOT_PATH, 'dist'),
    filename: 'bundle.js',
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: path.resolve(ROOT_PATH, 'app/index.html'),
      inject: true
    }),
    new webpack.HotModuleReplacementPlugin()
  ],
  debug: true,
  devtool: 'source-map',
  module: {
    loaders: [{
      test: /\.jsx?$/,
      exclude: /(node_modules|bower_components)/,
      loaders: ["babel-loader"],
      include: path.resolve(ROOT_PATH, 'app')
    },{
      test: /\.js?$/,
      exclude: /(node_modules|bower_components)/,
      loaders: ["babel-loader"],
      include: path.resolve(ROOT_PATH, 'app')
    },{
      test:    /\.elm$/,
      exclude: [/elm-stuff/, /node_modules/],
      loader:  'elm-hot!elm-webpack?verbose=true&warn=true'
    }]
  },
  devServer: {
    contentBase: path.resolve(ROOT_PATH, 'dist'),
    historyApiFallback: true,
    hot: true,
    progress: true,
    stats: 'error-only',
    port: 3000
  }
};

var path    = require('path');
var webpack = require('webpack');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = {
  devtool: 'source-map',
  entry: {},
  module: {
    loaders: [
      { test: /\.js$/, exclude: [/node_modules/], loader: 'ng-annotate!babel!jshint-loader' },
      { test: /\.html$/, loader: 'raw' },
      {
        test: /\.woff($|\?)|\.woff2($|\?)|\.ttf($|\?)|\.eot($|\?)|\.svg($|\?)/,
        loader: 'url-loader'
      },
      { test: /\.css$/, loader: 'style!css' },
      { test: /\.png/, loader: "url-loader?limit=100000&minetype=image/png" },
      { test: /\.jpg/, loader: "file-loader" },
      {
        test: /\.scss$/,
        loader: ExtractTextPlugin.extract('css!sass')
      },
    ],
  },
  jshint: {
    esnext: true
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: 'client/index.html',
      inject: 'body',
      hash: true
    }),

    new webpack.optimize.CommonsChunkPlugin({
      name: 'vendor',
      minChunks: function (module, count) {
        return module.resource && module.resource.indexOf(path.resolve(__dirname, 'client')) === -1;
      }
    }),

    new ExtractTextPlugin('public/style.css', {
      allChunks: true
    })
  ]
};

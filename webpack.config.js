const webpack = require('webpack');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { version } = require('./package.json');

const env = process.env.NODE_ENV;
const config = {
  entry: './src/main.js',
  mode: 'development',
  output: {
    path: __dirname + '/public',
    publicPath: '/',
    filename: 'bundle.js'
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        use: 'babel-loader',
        exclude: /node_modules/
      },
      {
        test: /\.scss$/,
        use: [MiniCssExtractPlugin.loader, 'css-loader', 'sass-loader']
      }
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      title: 'Cloudboard',
      filename: 'index.html',
      template: './src/index.html',
      inject: true,
      analytics: 'UA-89786772-1',
      favicon: './favicon.png',
      hash: true,
      version
    }),
    new MiniCssExtractPlugin({
      filename: 'style.css'
    }),
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify(env)
      }
    })
  ]
};

if (env === 'development') {
  config.devtool = 'source-map';
}

if (env === 'production') {
  config.mode = 'production';
}

module.exports = config;

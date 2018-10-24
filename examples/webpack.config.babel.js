/* eslint-env node */
import MiniCssExtractPlugin from 'mini-css-extract-plugin';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import {resolve, join} from 'path';
const packageDir = resolve(__dirname, '../..');

export default()=> ({
  mode: 'development',
  output: {
    path: join(packageDir, 'build'),
    filename: '[name].js'
  },
  optimization: {
    minimize: false,
    runtimeChunk: {name: 'runtime'},
    splitChunks: {
      chunks: 'all',
      name: 'shared'
    }
  },
  entry: {
    demoApp: './index.js'
  },
  plugins: [
    new MiniCssExtractPlugin(),
    new HtmlWebpackPlugin({
      template: './index.html'
    })
  ],
  module: {
    rules: [{
      test: /\.js$/,
      include: [__dirname],
      loader: 'babel-loader',
      options: {envName: 'webpack'}
    }, {
      test: /\.css$/,
      include: [__dirname],
      use: [
        MiniCssExtractPlugin.loader,
        {
          loader: 'css-loader',
          options: {
            modules: true,
            localIdentName: '[name]_[local]_[hash:base64:5]'
          }
        }
      ]
    }]
  },
  devtool: '#cheap-module-source-map',
  devServer: {stats: 'minimal'}
});

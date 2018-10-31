/* eslint-env node */
import {resolve, join} from 'path';
import MiniCssExtractPlugin from 'mini-css-extract-plugin';
import HtmlWebpackPlugin from 'html-webpack-plugin';


const packageDir = resolve(__dirname, '..');


export default ()=> ({
  mode: 'development',
  entry: {
    demoApp: './index.js'
  },
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
  plugins: [
    new MiniCssExtractPlugin(),
    new HtmlWebpackPlugin({
      template: './index.html'
    })
  ],
  resolve: {
    alias: {
      'leaflet-nearmap': join(packageDir, 'src')
    }
  },
  module: {
    rules: [{
      test: /\.js$/,
      include: [__dirname, join(packageDir, 'src')],
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

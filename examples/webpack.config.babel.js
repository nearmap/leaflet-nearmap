/* eslint-env node */
import {resolve, join} from 'path';
import HtmlWebpackPlugin from 'html-webpack-plugin';


const packageDir = resolve(__dirname, '..');


export default ()=> ({
  mode: 'development',
  entry: {
    demoApp: './index.js'
  },
  output: {
    path: join(packageDir, 'build'),
    filename: '[name]-[contenthash].js'
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
    }]
  },
  devtool: '#cheap-module-source-map',
  devServer: {stats: 'minimal'}
});

const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  entry: './index.js',
  module: {
    loaders: [
      {
        test: /\.jsx?$/,
        include: [
          __dirname,
          path.join(__dirname, '..'),
          path.dirname(require.resolve('corkboard')),
        ],
        // exclude: /node_modules/,
        loader: require.resolve('babel-loader'),
        query: {
          presets: [
            require.resolve('babel-preset-es2015'),
            require.resolve('babel-preset-stage-3'),
            require.resolve('babel-preset-react'),
          ],
        },
      },
    ],
  },
  resolve: {
    extensions: ['.js', '.jsx', '.css', ''],
  },
  plugins: [new HtmlWebpackPlugin()],
};

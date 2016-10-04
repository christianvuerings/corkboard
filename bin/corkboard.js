#!/usr/bin/env node
/* eslint-env node */
/* eslint import/no-dynamic-require:0 */

const path = require('path');
const minimist = require('minimist');
const webpack = require('webpack');

const argv = minimist(process.argv.slice(2));
const config = require(path.join(process.cwd(), argv.config || 'webpack.config.corkboard.js'));

const compiler = webpack(config);

const WebpackDevServer = require('webpack-dev-server');

const server = new WebpackDevServer(compiler, {
  colors: true,
  compress: true,
  hot: true,
  publicPath: config.output.publicPath,
  progress: true,
  watchOptions: {
    ignored: /node_modules/,
  },
});

server.listen(3000, 'localhost');

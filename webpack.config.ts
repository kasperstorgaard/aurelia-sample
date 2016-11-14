/// <reference path="./node_modules/@types/node/index.d.ts" />
import * as path from 'path';
import * as AureliaWebpackPlugin from 'aurelia-webpack-plugin';
import { ForkCheckerPlugin, TsConfigPathsPlugin } from 'awesome-typescript-loader';
import * as HtmlWebpackPlugin from 'html-webpack-plugin';
import * as webpack from 'webpack';

const title = 'Aurelia sample';
const baseUrl = '/';
const rootDir = path.resolve();
const srcDir = path.resolve('src');
const outDir = path.resolve('dist');

const shouldMinify = false;
const metadata = { root: rootDir, src: srcDir, title, baseUrl };

const bootstrapBundles = [
  'aurelia-bootstrapper-webpack',
  'aurelia-polyfills',
  'aurelia-pal',
  'aurelia-pal-browser'
];

const aureliaBundles = [
  'aurelia-binding',
  'aurelia-dependency-injection',
  'aurelia-event-aggregator',
  'aurelia-framework',
  'aurelia-history',
  'aurelia-history-browser',
  'aurelia-loader',
  'aurelia-loader-webpack',
  'aurelia-logging',
  'aurelia-logging-console',
  'aurelia-metadata',
  'aurelia-path',
  'aurelia-route-recognizer',
  'aurelia-router',
  'aurelia-task-queue',
  'aurelia-templating',
  'aurelia-templating-binding',
  'aurelia-templating-router',
  'aurelia-templating-resources'
];

const mainConfig = {
  devtool: 'inline-source-map',
  entry: {
    app: ['./src/main'],
    'aurelia-bootstrap': bootstrapBundles,
    aurelia: aureliaBundles
  },
  output: {
    path: outDir,
    filename: '[name].bundle.js',
    sourceMapFilename: '[name].bundle.map',
    chunkFilename: '[id].chunk.js'
  },
  resolve: {
    extensions: ['.js', '.ts'],
    modules: [srcDir, 'node_modules']
  },
  module:{
    rules: [{
      test: /\.ts$/,
      loader: 'awesome-typescript-loader',
      exclude: path.join(rootDir, 'node_modules')
    }, {
        test: /\.html$/,
        loader: 'html-loader',
        exclude: path.join(rootDir, 'index.html')
    }]
  },
  plugins: [
    new AureliaWebpackPlugin(metadata),
    new ForkCheckerPlugin(),
    new TsConfigPathsPlugin({}),
    new HtmlWebpackPlugin({
      template: 'index.html',
      chunksSortMode: 'dependency',
      minify: !shouldMinify ? undefined : {
        removeComments: true,
        collapseWhitespace: true
      },
      metadata
    }),
    new webpack.optimize.CommonsChunkPlugin({
      name: ['aurelia', 'aurelia-bootstrap']
    })
  ],
  devServer: {
    port: 9000,
    historyApiFallback: true,
    watchOptions: {
      aggregateTimeout: 300,
      poll: 1000
    },
    outputPath: outDir
  }
};

module.exports = mainConfig;

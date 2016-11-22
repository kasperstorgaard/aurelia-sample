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
  devServer: {
    historyApiFallback: true,
    outputPath: outDir,
    port: 9000,
    watchOptions: {
      aggregateTimeout: 300,
      poll: 1000
    }
  },
  devtool: 'inline-source-map',
  entry: {
    app: ['./src/main'],
    'aurelia-bootstrap': bootstrapBundles,
    aurelia: aureliaBundles
  },
  module: {
    rules: [{
      loader: 'awesome-typescript-loader',
      test: /\.ts$/
    }, {
      exclude: path.join(rootDir, 'index.html'),
      loader: 'html-loader',
      test: /\.html$/
    }, {
      loader: 'style-loader!css-loader',
      test: /\.css$/
    }]
  },
  output: {
    chunkFilename: '[id].chunk.js',
    filename: '[name].bundle.js',
    path: outDir,
    sourceMapFilename: '[name].bundle.map'
  },
  plugins: [
    new AureliaWebpackPlugin(metadata),
    new ForkCheckerPlugin(),
    new TsConfigPathsPlugin({}),
    new HtmlWebpackPlugin({
      chunksSortMode: 'dependency',
      metadata,
      minify: !shouldMinify ? undefined : {
        collapseWhitespace: true,
        removeComments: true
      },
      template: 'index.html'
    }),
    new webpack.optimize.CommonsChunkPlugin({
      name: ['aurelia', 'aurelia-bootstrap']
    })
  ],
  resolve: {
    extensions: ['.js', '.ts'],
    modules: ['node_modules']
  }
};

module.exports = mainConfig;

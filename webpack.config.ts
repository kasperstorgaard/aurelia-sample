/// <reference path="./node_modules/@types/node/index.d.ts" />
import { generateConfig, get, stripMetadata, EasyWebpackConfig } from '@easy-webpack/core';
import * as path from 'path';
import * as AureliaWebpackPlugin from 'aurelia-webpack-plugin';
import * as aurelia from '@easy-webpack/config-aurelia';
import * as typescript from '@easy-webpack/config-typescript';
import * as html from '@easy-webpack/config-html';
import * as generateIndexHtml from '@easy-webpack/config-generate-index-html';
import * as commonChunksOptimize from '@easy-webpack/config-common-chunks-simple';

const title = 'Aurelia sample';
const baseUrl = '/';
const rootDir = path.resolve();
const srcDir = path.resolve('src');
const outDir = path.resolve('dist');

const coreBundles = {
  bootstrap: [
    'aurelia-bootstrapper-webpack',
    'aurelia-polyfills',
    'aurelia-pal',
    'aurelia-pal-browser'
  ],
  // these will be included in the 'aurelia' bundle (except for the above bootstrap packages)
  aurelia: [
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
  ]
}

const mainConfig = {
  devtool: 'inline-source-map',
  entry: {
    app: ['./src/main'],
    'aurelia-bootstrap': coreBundles.bootstrap,
    aurelia: coreBundles.aurelia
  },
  metadata: {
    root: rootDir,
    src: srcDir,
    title,
    baseUrl
  },
  output: {
    path: outDir,
    filename: '[name].bundle.js',
    sourceMapFilename: '[name].bundle.map',
    chunkFilename: '[id].chunk.js'
  },
  devServer: {
    port: 9000,
    historyApiFallback: true,
    watchOptions: {
      aggregateTimeout: 300,
      poll: 1000
    },
    outputPath: outDir
  },
  plugins: [
    new AureliaWebpackPlugin({
      root: rootDir,
      src: srcDir,
      title,
      baseUrl
    })
  ],
  resolve: {
    modules: [srcDir].concat(get(this, 'resolve.modules', ['node_modules']))
  }
};

const typescriptConfig = typescript({});

const chunkConfig = commonChunksOptimize({
  appChunkName: 'app',
  firstChunk: 'aurelia-bootstrap'
});

const htmlConfig = html();
const indexConfig = generateIndexHtml()

const config = generateConfig(
  mainConfig,
  typescriptConfig,
  htmlConfig,
  indexConfig,
  chunkConfig
);

module.exports = stripMetadata(config);

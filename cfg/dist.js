'use strict';

let path = require('path');
let webpack = require('webpack');

let baseConfig = require('./base');
let defaultSettings = require('./defaults');

// Add needed plugins here
let BowerWebpackPlugin = require('bower-webpack-plugin');

let config = Object.assign({}, baseConfig, {
  entry: path.join(__dirname, '../src/index'),
  cache: false,
  devtool: 'sourcemap',
  plugins: [
    //用来检测相似的文件或者相似的内容
    new webpack.optimize.DedupePlugin(),
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': '"production"'
    }),
    new BowerWebpackPlugin({
      searchResolveModulesDirectories: false
    }),
    //用来压缩输出的js代码
    new webpack.optimize.UglifyJsPlugin(),
    //按照引用的数次排序  用的次数多的  压缩代码起的名字就短
    new webpack.optimize.OccurenceOrderPlugin(),
    //用来优化代码 合并相似的代码
    new webpack.optimize.AggressiveMergingPlugin(),
    //用来保证编译的时候不出错
    new webpack.NoErrorsPlugin()
  ],
  module: defaultSettings.getDefaultModules()
});

// Add needed loaders to the defaults here
config.module.loaders.push({
  test: /\.(js|jsx)$/,
  loader: 'babel',
  include: [].concat(
    config.additionalPaths,
    [ path.join(__dirname, '/../src') ]
  )
});

module.exports = config;

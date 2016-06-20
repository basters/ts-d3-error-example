var webpack = require('webpack');

var webpackMerge = require('webpack-merge');
var path = require('path');
var commonConfig = require('./webpack.common.js');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var CleanWebpackPlugin = require('clean-webpack-plugin');

module.exports = webpackMerge(commonConfig, {
    entry: {
        'vendor': './src/vendor.ts',
        'main':   './src/main.ts'
    },

    output: {
        path: './dist',
        filename: '[name].[hash].js',
        chunkFilename: '[id].[hash].chunk.js'
    },

    devtool: 'cheap-module-source-map',

    module: {
        loaders: [
            {
                test: /\.(png|jpe?g|gif|svg|woff|woff2|ttf|eot|ico)$/,
                loader: 'file?name=/assets/[name].[hash].[ext]'
            }
        ]
    },

    plugins: [
        new CleanWebpackPlugin(['dist/horisont'], {
          root: __dirname,
          verbose: true,
          dry: false
        }),
        new webpack.optimize.CommonsChunkPlugin({
            name: ['main', 'vendor']
        }),
        new HtmlWebpackPlugin({
            template: './src/index.html',
            filename: 'index.html'
        })
    ],
    devServer: {
        port: 8080,
        host: 'localhost',
        historyApiFallback: true,
        watchOptions: {
            aggregateTimeout: 300,
            poll: 1000
        },
        outputPath: __dirname + '/dist'
    }
});

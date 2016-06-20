var webpack = require('webpack');
var CleanWebpackPlugin = require('clean-webpack-plugin');

var path = require('path');

// Helper functions
var ROOT = path.resolve(__dirname, '..');

const MODULE_NAME = process.env.MODULE_NAME || false;


module.exports = {

    resolve: {
        extensions: ['', '.ts', '.js', '.css'],
        modulesDirectories: [ 'node_modules' ]
    },

    module: {
        loaders: [
            {
                test: /\.ts$/,
                loader: 'awesome-typescript', //TODO change to awesome
                exclude: [/\.(spec|e2e)\.ts$/]
            },
            {
                test: /\.html$/,
                include: /\/app\//,
                loader: 'file-loader?name=templates/[1]&regExp=src/app/(.*)'
            }
        ]
    },

    devtool: 'source-map',

    plugins: [
        // new ForkCheckerPlugin(),
        new webpack.NoErrorsPlugin(),
        new webpack.optimize.DedupePlugin(),
        new CleanWebpackPlugin(['dist'], {
            root: ROOT,
            verbose: true,
            dry: false
        }),
        new webpack.ProvidePlugin({
            $: 'jquery',
            jQuery: 'jquery',
            'window.jQuery': 'jquery'
        })
    ]
};

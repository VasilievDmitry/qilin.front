'use strict';

const webpack = require('webpack');
const path = require('path');
const VueLoaderPlugin = require('vue-loader/lib/plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

const ENV_DEV = process.env.NODE_ENV === 'development';
const ENV_PROD = process.env.NODE_ENV === 'production';
const MINIFY = !((process.env.MINIFY || '').toLowerCase() === 'no') && !ENV_DEV;

console.log('ENV_DEV:', ENV_DEV, 'ENV_PROD:', ENV_PROD, 'MINIFY:', MINIFY);

module.exports = {
    mode: process.env.NODE_ENV,
    context: path.join(__dirname, 'source'),
    entry: {
        main: './main.ts',
    },
    output: {
        path: path.join(__dirname, 'build'),
        publicPath: '',
        filename: './[name].js',
        chunkFilename: '[name].[chunkhash].js'
    },
    module: {
        rules: [
            {
                test: /\.vue$/,
                loader: 'vue-loader'
            },
            {
                test: /\.ts$/,
                use: [
                    {loader: 'babel-loader', options: {presets: ['@babel/preset-env']}},
                    {loader: 'ts-loader', options: {appendTsSuffixTo: ['\\.vue$']}},
                ],
                exclude: /(node_modules|bower_components)/
            },
            {
                test: /\.js$/,
                use: [
                    {loader: 'babel-loader', options: {presets: ['@babel/preset-env']}},
                ],
                exclude: /(node_modules|bower_components)/,
            },
            {test: /\.(png|jpg|svg|gif)$/, loader: 'file-loader?name=[path][name].[ext]'},
            {test: /\.woff2?$/, loader: 'url-loader?limit=10000&mimetype=application/font-woff&name=[path][name].[ext]'},
            {test: /\.ttf$/, loader: 'url-loader?limit=10000&mimetype=application/octet-stream&name=[1]&name=[path][name].[ext]'},
            {test: /\.eot$/, loader: 'file-loader?name=[path][name].[ext]'},
            {test: /\.otf$/, loader: 'file-loader?name=[path][name].[ext]'},
            {
                test: /\.s?css$/,
                use: [
                    ENV_DEV
                        ? 'vue-style-loader'
                        : MiniCssExtractPlugin.loader,
                    {
                        loader: 'css-loader',
                        options: {
                            // enable CSS Modules
                            modules: true,
                            // customize generated class names
                            localIdentName: '[local]_[hash:base64:8]'
                        }
                    },
                    'postcss-loader',
                    'sass-loader',
                ]
            }
        ]
    },
    plugins: [
        new MiniCssExtractPlugin({filename: '[name].css'}),
        new VueLoaderPlugin(),
    ].concat(
        ENV_DEV ? [new webpack.HotModuleReplacementPlugin()]
                : []
    ),
    resolve: {
        extensions: [ '.ts', '.tsx', '.js', '.vue' ]
    },
    devtool: ENV_DEV ? 'inline-source-map' : '',
    devServer: {
        hot: true,
        host: '0.0.0.0',
        proxy: {'/api/*': 'http://localhost:3000'},
        historyApiFallback: {index: 'index.html'},
    },

};
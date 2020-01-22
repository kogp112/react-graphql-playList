const { resolve } = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');

module.exports = {
    mode: 'production',
    context: resolve(__dirname, 'src'),
    entry: './index.tsx',
    output: {
        filename: 'build.[contenthash].js',
        path: resolve(__dirname, 'dist'),
    },
    devtool: '',
    resolve: {
        extensions: [".ts", ".tsx", ".js", ".json"]
    },
    module: {
        rules: [            
            { 
                test: /\.(ts|tsx)?$/, 
                use: [
                    {
                        loader: 'ts-loader',
                        options: {
                            transpileOnly: true,
                            compilerOptions: {
                              module: 'es2015'
                            }
                        },
                    }, 
                ] 
            },
            { enforce: "pre", test: /\.js$/, loader: "source-map-loader" },
            {
                test:/\.css$/,
                use: [MiniCssExtractPlugin.loader, "css-loader"]  
            },
            {
                test:/\.less$/,
                use: [MiniCssExtractPlugin.loader, "css-loader", "less-loader"]
            },
            { test: /\.png$/, loader: "url-loader?limit=100000" },
            { test: /\.jpg$/, loader: "file-loader" },
            { test: /\.(woff|woff2)(\?v=\d+\.\d+\.\d+)?$/, loader: 'url-loader?limit=10000&mimetype=application/font-woff' },
            { test: /\.ttf(\?v=\d+\.\d+\.\d+)?$/, loader: 'url-loader?limit=10000&mimetype=application/octet-stream' },
            { test: /\.eot(\?v=\d+\.\d+\.\d+)?$/, loader: 'file-loader' },
            { test: /\.svg(\?v=\d+\.\d+\.\d+)?$/, loader: 'url-loader?limit=10000&mimetype=image/svg+xml' }            
        ]
    },
    plugins: [
        new MiniCssExtractPlugin({
            filename: "style.css",
            chunkFilename: "[id].css"
          }),
        new HtmlWebpackPlugin({template: resolve(__dirname, 'public/index.html')}),
        new webpack.DefinePlugin({
            'process.env.NODE_ENV': '"production"'
        }),
        new webpack.optimize.LimitChunkCountPlugin({
          maxChunks: 1,
        }),
    ],
    optimization: {
      splitChunks: {
        cacheGroups: {
          commons: {
            test: /[\\/]node_modules[\\/]/,
            name: 'vendors',
            chunks: 'all'
          }
        }
      },
      minimizer: [
        new UglifyJsPlugin({
          cache: true,
          parallel: true,
          extractComments: true,
          uglifyOptions: {
            compress: false,
            ecma: 6,
            mangle: true,
            unused: true,
            dead_code: true,
            warnings: false,
            drop_debugger: true,
            conditionals: true,
            evaluate: true,
            drop_console: true,
            sequences: true,
            booleans: true,
            compress: {
              pure_getters: true,
              unsafe: true,
              unsafe_comps: true,
              ie8: false
            },
            output: {
              comments: false,
            },
          },
          sourceMap: true
        }),
      ],
    }
};
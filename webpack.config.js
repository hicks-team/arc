const path = require('path');
var Visualizer = require('webpack-visualizer-plugin');

const HardSourceWebpackPlugin = require('hard-source-webpack-plugin');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;

module.exports = {
    entry: './src/main/webapp/js/dev/index.js',
    output: {
        path: path.resolve('src/main/webapp/js/dist'),
        filename: 'bundle.js'
    },
    module: {
        rules: [
            { test: /\.css$/,
                use: [
                    { loader: "style-loader" },
                    { loader: "css-loader" }
                ]
            },
            { test: /\.(png|jpg|gif|svg|eot|woff2|woff|ttf)/,
                use: [
                    { loader: "url-loader" }
                ]
            },
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: "babel-loader"
            }, {
                test: /\.jsx?$/,
                exclude: /node_modules/,
                use: "babel-loader"
            }
        ]
    },
    devServer: {
        port: 9090,
        proxy: {
            "/api/*": {
                target: "http://localhost:8080"
            }
        },
        contentBase: path.join(__dirname, 'src/main/webapp'),
        publicPath: '/js/dist/mem',
        historyApiFallback: true
    },
    plugins: [
        new Visualizer(),
        new HardSourceWebpackPlugin(),
        new BundleAnalyzerPlugin()
    ]
}
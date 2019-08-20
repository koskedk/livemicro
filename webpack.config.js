const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin');
const CleanWebpackPlugin = require("clean-webpack-plugin").CleanWebpackPlugin;
const HtmlWebpackPlugin = require('html-webpack-plugin');
const path = require('path');
const APP_PATH = path.resolve(__dirname, 'src');

module.exports = {
    entry: {
        'bundle': path.join(APP_PATH, 'index.tsx'),
        'livemicro': path.join(APP_PATH, 'livemicro.ts')
    },
    output: {
        filename: '[name].js',
        path: path.resolve(__dirname, 'dist'),
    },

    resolve: {
        extensions: ['.ts', '.tsx', '.js', '.json']
    },

    module: {
        rules: [
            {test: /\.(ts|js)x?$/, loader: 'babel-loader', exclude: /node_modules/},
            {test: /\.(scss|sass|css)$/, use: ["style-loader", "css-loader", "sass-loader"]},
            {test: /\.(png|svg|jpg|jpeg|gif|ico)$/, use: ['file-loader']},
            {test: /\.(woff|woff2|eot|ttf|otf)$/, use: ['file-loader']}
        ],
    },
    devtool: "sourcemap",
    devServer: {
        headers: {
            "Access-Control-Allow-Origin": "*"
        },
        disableHostCheck: true
    },
    // externals: ["react", "react-dom"],
    plugins: [
        new CleanWebpackPlugin(),
        new HtmlWebpackPlugin({inject: true, template: path.join(APP_PATH, 'index.html')}),
        new ForkTsCheckerWebpackPlugin(),
    ]
};

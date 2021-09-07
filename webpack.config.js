const path = require('path');
const HtmlWebPackPlugin = require('html-webpack-plugin');

module.exports = {
    devtool: 'eval-source-map',
    entry:{
        app: path.join(__dirname, 'src', 'index.tsx')
    },
    target: 'web',
    resolve:{
        extensions: ['.ts', '.tsx', '.js', '.json', 'jsx']
    },
    module:{
        rules: [
            {
                test: /\.css$/i,
                use: ["style-loader", "css-loader"],
            },
            {
                test: /\.(graphql|gql)$/,
                exclude: /node_modules/,
                loader: 'graphql-tag/loader',
            },
            {
                test: /\.(js|jsx|ts|tsx)$/,
                enforce: 'pre',
                exclude: /node_modules/,
                use: [
                    {
                        loader: 'babel-loader',
                    },
                ],
            },
            {
                test: /\.(jpe?g|png|gif|svg)$/i,
                use: [
                    {
                        loader: 'file-loader',
                        options: {
                            query: {
                                name: 'assets/[name].[ext]',
                            },
                        },
                    },
                    {
                        loader: 'image-webpack-loader',
                        options: {
                            query: {
                                mozjpeg: {
                                    progressive: true,
                                },
                                gifsicle: {
                                    interlaced: true,
                                },
                                optipng: {
                                    optimizationLevel: 7,
                                },
                            },
                        },
                    },
                ],
            },
        ]
    },
    plugins:[
        new HtmlWebPackPlugin({
            template: './src/index.html',
            filename: './index.html'
        })
    ]
    
}
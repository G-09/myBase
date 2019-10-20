const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
module.exports = {
    // mode: 'production',// 生产环境
    mode: 'development',//开发环境
    entry: "./src/app.js",// 入口文件
    output: {
        path: path.resolve(__dirname, 'dist'), // 将打包好的文件放到 dist 目录之中。
        filename: "bundle.js",  // 打包好的 js 文件名字。
        publicPath: "", // 会在引用资源的 url 前加该字段，
    },
    devServer: {
        port: 3000,  // 端口
        progress: true,  // 打包进度条
    },
    module: {
        rules: [
            {
                test: /\.css$/,
                use: [
                    MiniCssExtractPlugin.loader,
                    "css-loader",
                    "postcss-loader", //是有先后顺序的,
                ]
            },
            {
                test: /\.scss$/,
                include: [path.resolve(__dirname, 'src')],   // 限制打包范围，提高打包速度
                exclude: /node_modules/,                     // 排除node_modules文件夹
                use: [
                    {
                        loader: MiniCssExtractPlugin.loader,  // 将处理后的CSS代码提取为独立的CSS文件，可以只在生产环境中配置，但我喜欢保持开发环境与生产环境尽量一致
                    },
                    {
                        loader: "css-loader"    // CSS加载器，使webpack可以识别css文件
                    },
                    {
                        loader: "postcss-loader"    //承载autoprefixer功能，为css添加前缀
                    },
                    {
                        loader: "sass-loader",       // 编译sass，webpack默认使用node-sass进行编译，所以需要同时安装 sass-loader 和 node-sass
                    }
                ]
            },
            { test: /\.js$/, exclude: /node_modules/, loader: "babel-loader" },
        ]
    },
    plugins: [ // 数组，注册所有的 webpack 插件。
        //html 插件
        new HtmlWebpackPlugin({
            template: './src/index.html',// 需要打包的 html 模板。
            filename: 'index.html' // 打包的名字
        }),
        new MiniCssExtractPlugin({
            filename: "main.css"
        })
    ],
}
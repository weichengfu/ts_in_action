// 公共文件配置
const HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports = {
    entry: './src/index.ts', // 指定入口文件
    output: {
        filename: 'app.js' // 输出目录默认，指定输入文件名称dist
    },
    resolve: {
        extensions: ['.js', '.ts', '.tsx']// 指定扩展名称
    },
    module: {
        rules: [
            {
                test: /\.tsx?$/i, // 比配文件正则
                use: [{
                    loader: 'ts-loader' // 因为是处理ts文件，所以需要引入ts-loader
                }],
                exclude: /node_modules/ // 排除node_modules的tsx文件
            }
        ]
    },
    plugins: [
        new HtmlWebpackPlugin({ // 使用插件 通过一个模板，生成网站首页，且能把我们的输出文件嵌入到这个文件中
            template: './src/tpl/index.html'
        })
    ]
}
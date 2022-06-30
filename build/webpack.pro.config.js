// 生产环境
const { CleanWebpackPlugin } = require('clean-webpack-plugin')

module.exports = {
    plugins: [
        new CleanWebpackPlugin() // 插件作用是在构建前清空dist目录
    ]
}
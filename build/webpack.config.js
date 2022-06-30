// 配置入口文件
const { merge } = require('webpack-merge') // 作用是将配置文件合并
const baseConfig = require('./webpack.base.config') // 引入公共配置文件
const devConfig = require('./webpack.dev.config') // 引入开发环境配置文件
const proConfig = require('./webpack.pro.config') // 引入生产环境配置文件

module.exports = (env, argv) => {
    let config = argv.mode === 'development' ? devConfig : proConfig; // 判断环境
    return merge(baseConfig, config); // 合并配置文件
};
// 开发环境配置
module.exports = {
  // 开发环境开启官方推荐的配置source-map
  // cheap忽略文件的列信息，因为在调试的时候列信息是没有用的
  // module会定位到ts源码而不是通过loader编译后的js源码
  // eval-source-map会将source-map以datarul的形式打包到文件中，重编译速度很快，不必担心性能问题
  devtool: 'eval-cheap-module-source-map' 
}
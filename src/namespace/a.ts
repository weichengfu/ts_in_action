// 命名空间使用namespace关键字来声明，后面接命名空间的名称
namespace Shape {
  // 命名空间里面可以定义任意多的变量
  // 这些变量一般在这个命名空间下可见
  const pi = Math.PI

  // 在这个命名空间下的变量如需在全局可见，需要使用export导出
  export function cricle(r: number) {
      return pi * r ** 2
  }
}
// 随着程序不断扩张，那么这个命名空间可能会越来越大
// 可以将命名空间进行拆分
// tip：
// 1，命名空间和模块不要混用，不要在一个模块里面使用命名空间
// 2，命名空间最好在全局的环境中使用

// 正确使用方式是
// 1，先将a.ts和b.ts编译成js文件
// 2，将编译成js文件通过script标签引入到src/tpl/index.html

// 引入a.ts的命名空间，使用三斜线指令
/// <reference path="a.ts" />

// 这里也定义了一个与a.ts同名的命名空间
namespace Shape {
  export function square(x: number) {
      return x * x
  }
}

// 命名空间的使用
console.log(Shape.cricle(2)) // 要使用另一个命名空间的方法，需要先通过三斜线指令引入
console.log(Shape.square(2))

import cricle = Shape.cricle
console.log(cricle(2))
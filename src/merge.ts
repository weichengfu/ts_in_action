// 一、同名的接口会合并
/* // 定义一个接口
interface A {
  x: number;
}
// 定义一个同名的接口
interface A {
  y: number;
}

// 同名的接口会合并为一个接口，所以变量a需要满足上方两个接口的约束
// 如果定义的环境是全局的话，那么这两个接口的定义可以在不同的文件中，也可以发生接口的合并
let a: A = {
  x: 1,
  y: 2,
} */




/* // 在接口中，对于非函数成员来说，需要是唯一性的，如果不唯一，他们的类型需要相同
// 定义一个接口
interface A {
  x: number;
  y: number; // 新增非函数成员类型y，因为类型与下面接口定义的y相同，所以没有问题
  // y: string; // 新增非函数成员类型y，因为类型与下面接口定义的y不相同，所以下方的接口成员y会报错
}
// 定义一个同名的接口
interface A {
  y: number;
} */



/* // 在接口中，对于函数成员来说，每一个函数都可以声明为一个函数重载
// 接口中定义的成员就是函数重载的列表
// 定义一个接口
interface A {
  foo(bar: number): number;// 顺序3
}
// 定义一个同名的接口
interface A {
  foo(bar: string): string; // 顺序1
  foo(bar: number[]): number[]; // 顺序2
}


// 函数实现
let a: A = {
  foo(bar: any) { // 函数重载在实现的时候，需要定义一个宽泛的类型
      return bar
  }
}
// 函数重载注意声明函数的顺序，因为编译器会按顺序匹配
// 在接口定义的时候，这些顺序是如何合并的呢，有一个顺序，在接口内部是按照书写的顺序确定
// 接口之间的顺序呢，后面的接口的函数定义会排在前面，前面的接口函数定义排在后面
// 以上的顺序就是如上顺序1、顺序2、顺序3 */


// 但是顺序也有例外，如果函数的参数是一个字面量的话，那么这个函数的声明就会被提升到最顶端，如下
// 定义一个接口
interface A {
  foo(bar: number): number; // 顺序5
  foo(bar: 'a'): number; // 新增函数的参数是一个字面量的 ，顺序1
}
// 定义一个同名的接口
interface A {
  foo(bar: string): string; // 顺序3
  foo(bar: number[]): number[]; // 顺序4
  foo(bar: 'b'): number; // 新增函数的参数是一个字面量的 ，顺序1
}


// 函数实现
let a: A = {
  foo(bar: any) { // 函数重载在实现的时候，需要定义一个宽泛的类型
      return bar
  }
}
// 顺序如上函数的声明就会被提升到最顶端，顺序也改变了




// 命名空间的合并
// 在不同的文件，定义同名的命名空间，会发生合并
// 在命名空间中，导出的成员不能重复定义，只能有一个export
// namespace Shape {
//   export function square(x: number) {
//       return x * x
//   }
//   // export function square(x: number) { // 函数实现重复
//   //     return x * x
//   // }
// }




// 命名空间和函数的合并
// 命名空间和函数进行合并，命名空间需要放在函数的后面
// 定义一个函数
function Lib() {}
// 定义一个与函数同名的命名空间
namespace Lib {
  export let version = '1.0' // 命名空间中，导出一个变量，相当于给上面Lib函数增加了属性
}
console.log(Lib.version) // 1.0




// 命名空间和类进行合并
// 命名空间和类进行合并，命名空间需要放在类的后面
class C {}
namespace C {
  export let state = 1 // 相当于给类增加了静态的属性
}
console.log(C.state) // 1



// 命名空间和枚举进行合并
enum Color {
  Red,
  Yellow,
  Blue
}
namespace Color {
  export function mix() {} // 相当于给枚举增加了一个方法
}
console.log(Color)

// 一、函数定义的方式
// 1，通过function来定义，需要明确指出参数的类型，函数的返回值可以通过ts类型推断，可以省略
function add1(x: number, y: number) {
  return x + y
}

// 以下三种方式，只是类型的定义，不是函数的实现，真正调用的时候需要书写函数体
// 2，通过变量定义函数类型
let add2: (x: number, y: number) => number

// 3，通过类型别名定义函数类型
type add3 = (x: number, y: number) => number


// 3，通过接口定义函数类型
interface add4 {
  (x: number, y: number): number
}


// js中对函数的参数是没有个数限制的，但是在ts中，形参和实参是一一对应的
// add1(1, 2, 3)


// 二、可选参数，在参数后面加问号?
// 可选参数必须位于必选参数的后面
function add5(x: number, y?: number) {
  return y ? x + y : x
}
add5(1)


// 三、参数定义默认值 参数变量=默认值
function add6(x: number, y = 0, z: number, q = 1) {
  return x + y + z + q
}
// 必选参数是不能省略的，必须明确传入undefined
// 必选参数之后的默认值可以不传undefined，比如q
add6(1, undefined, 3)


// 四、当参数不确定的时候可以使用剩余参数
// 剩余参数...是以数组形式存在的，用数组注解number[]
function add7(x: number, ...rest: number[]) {
  return x + rest.reduce((pre, cur) => pre + cur);
}
add7(1, 2, 3, 4, 5)


// 五、函数重载，含义是两个函数名称相同，参数个数或者名称不同，那么就实现了函数重载
// 好处是不需要为了相似功能的函数，使用不用的函数名称，增强了函数的可读性
// ts中需要先定义几个名称相同函数声明
// 最后ts要求我们需要在类型最宽泛的版本中去实现重载，一般最后一个函数
function add8(...rest: number[]): number;
function add8(...rest: string[]): string;
function add8(...rest: any[]): any {
  let first = rest[0];
  if (typeof first === 'number') {
      return rest.reduce((pre, cur) => pre + cur);
  }
  if (typeof first === 'string') {
      return rest.join('');
  }
}

// ts在处理重载的时候，会先去查询重载的三个声明列表
// 会先尝试第一个定义，如果匹配的就用第一个定义，否则往下查找
// 所以把最容易匹配的函数定义写在前面
console.log(add8(1, 2))
console.log(add8('a', 'b', 'c'))
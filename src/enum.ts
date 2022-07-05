// 数字枚举
// 默认它们的举值从0开始依次递增
enum Role {
  Reporter,
  Developer,
  Maintainer,
  Owner,
  Guest
}
// console.log(Role.Reporter) 查看枚举值 0 
// console.log(Role) 打印出对象

// 可以自定义初始值，后面的依次递增
enum Role1 {
  Reporter = 1,
  Developer,
  Maintainer,
  Owner,
  Guest
}


// 字符串枚举
enum Message {
  Success = '恭喜你，成功了',
  Fail = '抱歉，失败了'
}

// 异构枚举，将数字枚举和字符串枚举混合起来用，这种情况比较容易引起混搅，不建议使用
enum Answer {
  N,
  Y = 'Yes'
}

// 枚举成员
// Role.Reporter = 0 // 报错，枚举成员的值是只读的，不允许修改的
// 枚举成员的分类
// 常量枚举成员（1、没有枚举值的情况，2、对已有枚举成员的引用，3、常量的表达式，4、需要被计算的枚举成员）
// 需要被计算的枚举成员（1、）
enum Char {
  // const member // 常量枚举
  a, // 1、没有枚举值的情况
  b = Char.a, // 2、对已有枚举成员的引用
  c = 1 + 3, // 常量的表达式，会在编译的时候计算出结果，会以常量的形式在运行环境
  
  // computed member 需要被计算的枚举成员，非常量的表达式，这些表达式不会在编译的阶段计算，而会被保留到程序的执行阶段
  // 在computed member成员后面的枚举必须要被赋初始值，否则报错
  d = Math.random(),
  e = '123'.length,
  f = 4,
}

// 常量枚举
// 特性是在编译阶段被移除
// 作用是当我们不需要一个对象，而需要对象的值的时候就可以使用，可以减少在编译阶段的代码，不会被编译出来
const enum Month { // 这段代码不会被编译出啦，而是在使用常量枚举的地方直接替换为枚举值，如下面这个例子
  Jan,
  Feb,
  Mar,
  Apr = Month.Mar + 1,
  // May = () => 5
}
let month = [Month.Jan, Month.Feb, Month.Mar] // 使用常量枚举，可以减少在编译阶段的代码比较简洁 let month = [0, 1, 2]

// 枚举类型
enum E { a, b } // 枚举成员没有任何枚举值
enum F { a = 0, b = 1 } // 所有成员都是数据枚举  
enum G { a = 'apple', b = 'banana' } // 所有成员都是字符串枚举 

// 定义两个枚举类型，可以将任意的number类型赋值给枚举类型，取值可以超出枚举类型的定义
// let e: E = 1
// let f: F = 3
// console.log(e === f)// 不用类型的枚举是不可以比较的

// 定义了三种枚举类型
let e1: E.a = 3
let e2: E.b = 3
let e3: E.a = 3
// console.log(e1 === e2) // 不可以比较
// console.log(e1 === e3) // 相同的枚举成员E.a，可以比比较


let g1: G = G.a // 字符串枚举的取值只能是字符串的枚举成员的类型
let g2: G.a = G.a
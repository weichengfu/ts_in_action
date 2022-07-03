// 一、泛型函数
// 在函数名称后面加上尖括号，里面有变量T，参数和返回值都是T，这样一个泛型函数就形成了
// 类型T不需要预先指定，相当于any类型
// 保证了输入参数和返回值的类型是一致
// 定义
/* function log<T>(value: T): T {
  console.log(value);
  return value;
}
// 调用泛型函数方式
log<string[]>(['a', ',b', 'c']) // 方式1 指定参数类型
log(['a', ',b', 'c']) // 方式2 利用ts类型推断，不指定参数类型，推荐使用这种 */


// 二、我们不仅可以用泛型定义一个函数，还可以使用泛型定义一个泛型函数类型别名
// type Log = <T>(value: T) => T // 定义一个泛型函数别名
// let myLog: Log = log // 泛型函数的实现


// 三、泛型接口
// interface Log { // 定义一个泛型函数接口，这样接口仅仅约束了一个函数，和类型别名是等价的
//     <T>(value: T): T
// }
/* interface Log<T> { // 定义一个泛型函数接口，也可以约束接口的其他成员，这样接口的成员都可受到泛型变量的约束
    (value: T): T
}
// let myLog: Log = log // 报错，泛型类型“Log<T>”需要 1 个类型参数。
// let myLog: Log<number> = log // 注意，当泛型变量约束了整个接口后，在实现的时候必须指定一个类型
// myLog(1) // 那么myLog参数只能是number */

// 四、泛型接口默认值
/* interface Log<T = string> { 
  (value: T): T
}
let myLog: Log = log
myLog('1') */




// 五、 定义一个泛型类
// 泛型不用于类的静态成员
class Log<T> { // 在类名后面增加<T>，可以约束类的成员了
  run(value: T) {
      console.log(value)
      return value
  }
  // static run1(value: T) { // 报错，静态成员不能引用类类型参数。
  //     console.log(value)
  //     return value
  // }
}
// let log1 = new Log<number>() // 实例化类，显示传入类型成员
// log1.run(1) // 实例的方法将受到<number>类型的约束
// let log2 = new Log() // 可以不传入参数，当不传入类型参数的的时候，value就可以是任意值
// log2.run({ a: 1 })
// log2.run('1')



// 六、约束泛型
// 希望不仅打印出参数，也需要打印出参数的属性
// 改造一下
// function log<T>(value: T): T {
//   console.log(value, value.length); // 报错，类型“T”上不存在属性“length”。
//   return value;
// }


// 上面报错，因为有些类型没有length属性，那么需要使用类型约束
// 先约定义一个接口
interface Length {
  length: number // 有一个length属性
}
function logAdvance<T extends Length>(value: T): T { // 让类型T继承这个接口，表示T受到了类型约束，不再是任意类型都可以传了，输入参数必须有length属性
  console.log(value, value.length); // 不仅打印出参数，也需要打印出参数的属性
  return value;
}
// 实现
logAdvance([1])
logAdvance('123')
logAdvance({ length: 3 })
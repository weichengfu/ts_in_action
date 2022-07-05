// 基础类型推断
// 一、从右向左推断，从表达式右边的值推断出表达式左边变量的类型
// 初始化变量
let aa; // 如果不指定变量类型，那么ts就会认为是any类型 let aa: any
let a = 1; // 推断为number类型 let a: number
let b = [1, null, 'a'] // 当需要从多个类型中推断出一个类型的时候，ts会从中推断出兼容所有类型的通用类型，这就是最佳通用类型推断，推断为let b: (string | number | null)[]，使用联合类型
let c = {x: 1, y: 'a'} // 推断为let c: { x: number; y: string; }
let d = (x = 1) => x + 1 // 推断为let d: (x?: number) => number



// 二、从左向右推断，就是上下文类型推断
// 通常发生在事件处理中
// ts根据左侧事件绑定来推断出右侧事件的类型，如类型(parameter) event: KeyboardEvent
window.onkeydown = (event) => {
  // 同时知道event有哪些属性
  // console.log(event)
}


// 三、ts类型推断不符合我们的预期，而且我们有自信比ts更加了解我们的代码
// 那么可以使用ts提供的方法，覆盖ts的推断，这个方法就是类型断言
// 定义一个空对象
// let foo = {}
// foo.bar = 1 // 报错，类型“{}”上不存在属性“bar”

// 解决报错问题
// 定义一个接口
// interface Foo {
//     bar: number
// }
// let foo = {} as Foo // 使用断言，把foo指定为上面接口定义的类型
// foo.bar = 1 


// 断言不能乱用，比如已经使用了断言，但是foo是一个空对象，没有按照接口定义的属性，传入bar
interface Foo {
  bar: number
}
// let foo = {} as Foo // 使用断言，把foo指定为上面接口定义的类型，最后不用断言了，用下面的接口注解
// let foo:Foo = {} // ts就可以报错提示了，类型 "{}" 中缺少属性 "bar"，但类型 "Foo" 中需要该属性。
let foo: Foo = { // 这样就正常约束了
    bar: 1
}
/*
 * X（目标类型） = Y（源类型），X 兼容 Y
 */

// 一、定义一个字符串类型s
// 关闭tsconfig.json文件中的"strictNullChecks": false，字符串选项可以被复制为null的
// 这时候可以说，字符串类型是兼容null类型的，也就是说null是字符串类型的子类型
let s: string = 'a'
// s = null


// 二、之所以要讨论兼容性问题，是因为ts允许我们把一些类型不同的变量相互赋值，虽然在一定程度上产生不可靠的行为，但增加了语言的兼容性
// 兼容性主要存在以下情况
// 1，接口兼容性
// 定义接口X
interface X {
    a: any;
    b: any;
}
// 定义接口Y
interface Y {
    a: any;
    b: any;
    c: any;
}
// 定义两个变量，符合这两个接口类型
let x: X = {a: 1, b: 2}
let y: Y = {a: 1, b: 2, c: 3}
// 那么x和y能相互赋值吗？
x = y // 正常 因为y包含x的所有属性，那么y可以认为是x类型，也是x类型兼容y类型，体现了ts的鸭式辨型法，如果一只鸟游起来像鸭子，叫起来像鸭子，那么久可以认为是鸭子，总结，源类型必须具备目标类型的必要属性，就可以进行赋值
// y = x // 报错

// 口诀，接口之间相互兼容是，成员少的兼容成员多的



// 2，函数兼容性
// 判断两个函数是否兼容，通常发生在两个函数相互赋值的情况下
// 定义个高阶函数（目标函数）
type Handler = (a: number, b: number) => void
function hof(handler: Handler) {
    return handler
}


// 当我们传入一个参数的函数handler1时，那么Handler久会判断是否兼容
// 那么Handler就是目标类型，传入的handler1就是源类型
// 如果要目标类型兼容源函数，需要同时满足三个条件 1)参数个数 2)参数类型 3) 返回值类型

// 1)参数个数 
// 1.1目标函数的参数个数，一定要多于源函数的参数个数
// 一个参数，源函数参数少于目标函数，正常
let handler1 = (a: number) => {} 
hof(handler1) // 正常

// 三个参数，源函数参数多于目标函数，
let handler2 = (a: number, b: number, c: number) => {}
// hof(handler2) // 报错 类型“(a: number, b: number, c: number) => void”的参数不能赋给类型“Handler”的参数。



// 1.2可选参数和剩余参数
// 具有可选参数和剩余参数会遵循其他原则
// 定义三个参数
/* let a = (p1: number, p2: number) => {} // 固定参数
let b = (p1?: number, p2?: number) => {}// 可选参数
let c = (...args: number[]) => {}// 剩余参数
a = b // 固定参数可以兼容可选参数
a = c // 固定参数可以兼容剩余参数的
// b = a // 可选参数不兼容固定参数，如需兼容可以关闭"strictFunctionTypes": false
// b = c // 可选参数不兼容剩余参数，如需兼容可以关闭"strictFunctionTypes": false
c = a // 剩余参数可以兼容固定参数
c = b // 剩余参数可以兼容可选参数 */



// 2)参数类型
// 参数类型需要匹配
// 2.1定义基础类型参数
let handler3 = (a: string) => {}
// hof(handler3) // 报错，类型“(a: string) => void”的参数不能赋给类型“Handler”的参数。参数“a”和“a” 的类型不兼容。不能将类型“number”分配给类型“string”。


// 2.2对象类型参数
// 定义接口1
interface Point3D {
    x: number;
    y: number;
    z: number;
}
// 定义接口2
interface Point2D {
    x: number;
    y: number;
}
// 定义两个函数，参数是上面定义的两个接口类型
// 这两个函数参数个数相同，类型都是对象
let p3d = (point: Point3D) => {} 
let p2d = (point: Point2D) => {} 
p3d = p2d // p3d兼容p2d
// p2d = p3d // 报错，那如果需要参数少的兼容参数多的，那需要关闭"strictFunctionTypes": false配置，那么这种函数的参数之间可以相互赋值的的情况呢，是函数参数的双向邪辩，这种情况，允许我们把一个精确的类型，赋值给一个不那么精确的类型这样就比较方便，就不需要我们把一个不精确的类型断言为一个精确的类型了

// 口诀：成员个数多的兼容成员个数少的，与1，接口兼容性的结论相反
// 那么可以将接口成员看成里面有有几个参数，参数多的兼容参数少的和1)参数个数结论一致


// 3) 返回值类型
// 3.1 ts要求我们目标函数的返回值类型必须和原函数的返回值类型相同，或者为其子类型
let f = () => ({name: 'Alice'}) // 返回值只有一个字段
let g = () => ({name: 'Alice', location: 'Beijing'})// 返回值有两个字段
f = g // f返回值类型是g返回值类型的子类型，成员少的兼容成员多的，和鸭式辨型法一样
// g = f // 报错


// 3.2 函数重载
// 成员运行的时候编译器会查找这个重载列表，使用第一个匹配的函数来实现下面的函数
// 所以在函数重载中，目标函数的参数要多于源函数的参数，而且返回值的类型也要符合要求
function overload(a: number, b: number): number // 列表中的函数是目标函数
function overload(a: string, b: string): string // 列表中的函数是目标函数
function overload(a: any, b: any): any {} // 具体的实现就是源函数
// function overload(a: any): any {}
// function overload(a: any, b: any, c: any): any {} // 报错，因为源函数参数多于目标函数的参数
// function overload(a: any, b: any) {} // 报错，返回值的类型不兼容



// 三、枚举兼容性
// 枚举类型和数值类型是完全兼容的
enum Fruit { Apple, Banana }
enum Color { Red, Yellow }
let fruit: Fruit.Apple = 1
let no: number = Fruit.Apple

// let color: Color.Red = Fruit.Apple // 枚举之间是不兼容的




// 四、类兼容性
// 注意，类兼容性和接口兼容性比较相似，只比较结构
// 类之间的兼容性比较时，构造函数和静态成员时不参与比较的
// 如果两个类具有相同的实例成员，那么他们的实例就完全兼容
/* // 定义类
class A {
    constructor(p: number, q: number) {}
    id: number = 1
}
// 定义类
class B {
    static s = 1
    constructor(p: number) {}
    id: number = 2
}
// 创建两个实例
let aa = new A(1, 2)
let bb = new B(1)
// 可以看出两个实例完全兼容，因为它们都具有一个实例属性id，构造函数和静态成员时不参与比较的
aa = bb
bb = aa */


// 如果类中具有私有成员
// 定义类
class A {
  constructor(p: number, q: number) {}
  id: number = 1
  private name: string = '' // 具有私有成员
}
// 定义类
class B {
  static s = 1
  constructor(p: number) {}
  id: number = 2
  private name: string = '' // 具有私有成员
}
// 创建两个实例
let aa = new A(1, 2)
let bb = new B(1)
// 可以看出如果两个类中具有私有成员，那么他们就不兼容了，这时候只有父类和子类是相互兼容的
// aa = bb // 报错，类型具有私有属性“name”的单独声明
// bb = aa // 报错，类型具有私有属性“name”的单独声明

// 定义一个A的子类C 
// 父类和子类是相互兼容的
class C extends A {}
let cc = new C(1, 2) // 创建C的实例
aa = cc
cc = aa



// 五、泛型兼容性
// 1，泛型接口
// 定义一个接口，没有任何成员
interface Empty<T> {
    // value: T
}
// 定义两个变量，类型都是Empty，只是类型参数不同
let obj1: Empty<number> = {};
let obj2: Empty<string> = {};
obj1 = obj2 // 因为泛型接口中没有任何成员，所以它们是兼容的，如果泛型接口中有成员value: T，那么久不兼容了
// 也就是说，只有泛型接口参数T被接口成员使用的时候，才会影响泛型的兼容性


// 2，泛型函数
// 定义两个泛型函数
let log1 = <T>(x: T): T => {
    console.log('x')
    return x
}
let log2 = <U>(y: U): U => {
    console.log('y')
    return y
}
log1 = log2 // 兼容的，也就是说，如果两个泛型函数的定义完全相同，但没有指定类型参数，那么他们之间也是相互兼容的


// 总结：ts允许我们在类型和类型之间相互赋值，这个特性增加了语言的灵活性



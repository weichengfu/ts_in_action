// 定义原始类型注解
let bool: boolean = true
let num: number = 123
let str: string = "abc"
// str = 123 // 这里报错了，不能将类型“number”分配给类型“string”, ts的数据类型不可以被改

// 定义数组注解的两种方式
let arr1: number[] = [1, 2, 3] // 元素类型名称加上[]
let arr2: Array<number>= [1, 2, 3] // Array关键字机上<元素类型名称> （Array是ts为我们预定义的范型）

// let arr2: Array<number>= [1, 2, 3，'4'] // 这里报错了，不能将类型“string”分配给类型“number”
// 数组元素有多个类型可以使用联合类型来处理
// let arr2: Array<number ｜ string>= [1, 2, 3，‘4’] // 表示数组的元素可以是number也可以是string类型，完美

// 元组类型注解，是一种特殊的数字，约束的数组元素的类型和个数
let tuple:[number, string] = [0,'1']

// let tuple:[number, string] = ['1', '1'] // 报错了 不能将类型“string”分配给类型“number”
// let tuple:[number, string] = [0,'1', 2] // 报错了 不能将类型“[number, string, number]”分配给类型“[number, string]”。源具有 3 个元素，但目标仅允许 2 个

// tuple.push(2) // 元组允许添加元素，不建议这样使用
// tuple[2] // 报错，元组不允许访问元素，不建议这样使用

// 函数参数和返回值增加函数注解 方式1
// let add = (x, y) => × + y // 报错，参数“x”隐式具有“any”类型，参数“y”隐式具有“any”类型

// 给参数和返回值注解
// let add = (x:number, y:number):number => x + y
// 函数返回值的注解可以省略，利用ts类型推断
// let add = (x:number, y:number) => x + y

// 函数参数和返回值增加函数注解 方式2
// let computer : (x:number, y:number) => number = (a, b) => a + b
// 或者
// let computer : (x:number, y:number) => number
// computer = (a, b) => a + b

// 对象注解
let obj: object = {x: 1, y: 2} 
// 如果使用这种简单的object来给对象增加注解是不允许修改对象的属性值
// obj.x = 3 // 报错，类型“object”上不存在属性“x”。
// 需要将对象注解指定到对象属性
// let obj: {x:number,y:number} = {x: 1, y: 2}

// symbol注解，symbol具有唯一的值
let s1: symbol = Symbol()
let s2: symbol = Symbol()

console.log(s1 === s2);


// undefined null 注解
let un:undefined = undefined 
// let un1:undefined = 1 // 注意，如果变量注解为undefined，只能被赋值为undefined，不能被赋值为其他数据类型。否则报错，不能将类型“1”分配给类型“undefined”
let nu:null = null

// undefined 和 null是任何类型的子类型，可以赋值给其他类型
// 方式1，需要修改tsconfig.json配置，strictNullChecks修改为false
let num2: number = 123
// num2 = undefined
// num2 = null

// 方式2，使用联合类型
let num3: number | undefined  | null = 123
num3 = undefined
num3 = null


// void注解 
// 在js中void是一种操作符，可以让任何表达式返回undefined
// void 0 返回undefined，为什么有这种机制呢，是因为undefined在js中不是一个保留字，我们甚至可以定义一个undefined变量去覆盖全局的undefined
// (function(){console.log(undefined)})() 输出undefined
// (function(){var undefined = 0; console.log(undefined)})() 输出0 覆盖了全局的undefined

// 使用void可以避免undefined被全局覆盖，确保返回的值是undefined
// void表示没有任何返回值的类型，比如没有任何返回值的函数，它的类型就是void
let noReturn = () => {}

// any注解
// 在ts中如果不指定任何类型，那么就是any类型，可以任意赋值，和js没有区别
// 不是特殊情况，不建议使用any
// let x
// x = 1
// x = []

// never注解
// never表示永远不会有返回值的类型
// 一个函数抛出异常，这个函数永远不会有返回值，就是never类型
let error = ()=>{
  throw new Error('error')
}

// 死循环，这个函数永远不会有返回值，就是never类型
let endless = ()=>{
  while(true){}
}


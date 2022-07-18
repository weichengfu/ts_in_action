// 一、交叉类型
// 使用&将多个类型合并为一个类型，新的类型将具有所有类型的特性，所以交叉类型特别适合对象混入的场景
// 定义一个接口
interface DogInterface {
    run(): void
}
// 定义一个接口
interface CatInterface {
    jump(): void
}
// 定义一个变量这个变量就是上述两个类型的交叉类型，必须具有两个接口的成员
let pet: DogInterface & CatInterface = {
    run() {},
    jump() {}
}
// 注意，交叉类型不是取类型的交集，而是取类型的并集


// 二、联合类型
// 声明的类型并不确定，可以为多个类型中的一个
// 1，基本的联合类型
// let a: number | string = 1
// 字面量类型，我们不仅限定一个变量的类型，也限定变量的取值
let b: 'a' | 'b' | 'c' // 定义字符串字面量的联合类型
let c: 1 | 2 | 3// 定义数字字面量的联合类型


// 2，对象的联合类型
// 定义Dog类实现DogInterface接口
class Dog implements DogInterface {
    run() {}
    eat() {}
}
// 定义Cat类实现CatInterface接口
class Cat  implements CatInterface {
    jump() {}
    eat() {}
}

// 定义一个枚举
enum Master { Boy, Girl }
// 实现一个函数
function getPet(master: Master) {
    // 判断参数类型，返回不用的实例
    let pet = master === Master.Boy ? new Dog() : new Cat(); // let pet: Dog | Cat 是联合类型
    // pet.run()
    // pet.jump()
    pet.eat() // pet 如果一个对象是联合类型，在类型未确定的情况下，只能访问类型的共有成员
    return pet
}


// 可区分的联合类型，是一种结合了联合类型和字面量类型的类型保护方法
// 核心思想是，如果一个类型如果是多个类型的联合类型，并且每个类型直接有一个公共属性
// 那么我们就可以通过一个公共属性创建不同的保护区块
// // 声明接口Square
// interface Square {
//     kind: "square";
//     size: number;
// }
// // 声明接口Rectangle
// interface Rectangle {
//     kind: "rectangle";
//     width: number;
//     height: number;
// }
// // 上述接口都有kind属性表示他们的类型
// // 用别名声明了一个联合类型
// type Shape = Square | Rectangle

// // 计算不同面积的函数
// // 核心是，利用相同的属性创建不同的保护区块
// function area(s: Shape) {
//     switch (s.kind) { // 通过类型别名可以访问不用的属性
//         case "square":
//             return s.size * s.size;
//         case "rectangle":
//             return s.height * s.width;
//     }
// }
// console.log(area({kind: 'circle', radius: 1}))



// 错误情况，修改方案
// 声明接口Square
interface Square {
    kind: "square";
    size: number;
}
// 声明接口Rectangle
interface Rectangle {
    kind: "rectangle";
    width: number;
    height: number;
}
// 声明接口Circle
interface Circle { // 新增一个接口，但是下面函数没有实现这个类型，程序运行就会报错
    kind: "circle";
    radius: number;
}
// 上述接口都有kind属性表示他们的类型
// 用别名声明了一个联合类型
type Shape = Square | Rectangle | Circle

// 计算不同面积的函数
// 核心是，利用相同的属性创建不同的保护区块
// function area(s: Shape) {
//     switch (s.kind) { // 通过类型别名可以访问不用的属性
//         case "square":
//             return s.size * s.size;
//         case "rectangle":
//             return s.height * s.width;
//         case 'circle':
//     }
// }
// console.log(area({kind: 'circle', radius: 1})) // undefined报错，因为area函数没有实现kind: 'circle'类型，这种报错ts没有提示

// 如果让ts给出相应的错误提示呢
// 方法1 给函数指定一个明确的返回值类型，比如number类型
/* function area(s: Shape) : number { // 报错，ts就会判断所有的switch分支是否包含的所有情况
    switch (s.kind) { // 通过类型别名可以访问不用的属性
        case "square":
            return s.size * s.size;
        case "rectangle":
            return s.height * s.width;
        case 'circle':
    }
}
console.log(area({kind: 'circle', radius: 1})) // undefined报错，因为area函数没有实现kind: 'circle'类型 */

// 方法2 利用never类型
// function area(s: Shape) {
//     switch (s.kind) { // 通过类型别名可以访问不用的属性
//         case "square":
//             return s.size * s.size;
//         case "rectangle":
//             return s.height * s.width;
//         default: // 定义default分支  报错，类型“Circle”的参数不能赋给类型“never”的参数
//             // 定义一个自执行函数，这个函数的作用是检查s是否是never类型，如果是never类型说明前面的分支都被覆盖了，这个分支拥有不会走到
//             // 如果s不是never类型呢，前面的分支有遗漏，需要我们按照下面这个函数不上分支
//             return ((e: never) => {throw new Error(e)})(s) 
//     }
// }
// console.log(area({kind: 'circle', radius: 1}))

// 补充circle类型的分支，不然default分支 报错
function area(s: Shape) {
    switch (s.kind) { // 通过类型别名可以访问不用的属性
        case "square":
            return s.size * s.size;
        case "rectangle":
            return s.height * s.width;
        case 'circle':
            return Math.PI * s.radius ** 2
        default: // 定义default分支 
            return ((e: never) => {throw new Error(e)})(s) // 定义一个自执行函数，含义是检查s是否是never类型，如果是never类型说明前面的分支都被覆盖了
    }
}
console.log(area({kind: 'circle', radius: 1}))

// 总结：交叉类型比较合适对象的混入，联合类型可以使类型具有一定的不确定性，可增强代码的灵活性
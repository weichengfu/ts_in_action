// 一、对象类型的接口基本使用
//  interface List { // 定义接口
//   id: number;
//   name: string;
// }
// interface Result {// 定义接口
//   data: List[]
// }

// function render(result: Result) {
//   result.data.forEach((value) => {
//       console.log(value.id, value.name)
//   })
// }
// let result = {
//   data: [
//       {id: 1, name: 'A'},
//       {id: 2, name: 'B'}
//   ]
// }
// render(result)


// 二、对象类型的接口，入参和定义的接口不一致
// ts允许这种情况的发生，因为ts采用了一种鸭式辩型法，这是一种动态语言类型风格
// 如果一只鸟，看起来像鸭子，游起来像鸭子，那么这子鸟就可以被认为是鸭子
// 所以我们只要传入的对象满足接口的必要条件，那么就是被允许的，即使传入多余的字段，也可以通过类型检查
// interface List { // 定义接口
//   id: number;
//   name: string;
// }
// interface Result {// 定义接口
//   data: List[]
// }

// function render(result: Result) {
//   result.data.forEach((value) => {
//       console.log(value.id, value.name)
//   })
// }
// let result = {
//   data: [
//       {id: 1, name: 'A', sex: 'male'}, // 多了一个 sex: 'male'
//       {id: 2, name: 'B'}
//   ]
// }
// render(result) 


// 三、对象类型的接口，入参和定义的接口不一致
// ts允许这种情况的发生，因为ts采用了一种鸭式辩型法，这是一种动态语言类型风格
// 如果一只鸟，看起来像鸭子，游起来像鸭子，那么这子鸟就可以被认为是鸭子
// 所以我们只要传入的对象满足接口的必要条件，那么就是被允许的，即使传入多余的字段，也可以通过类型检查
// 这种情况有一种例外，如果我们直接传入对象字面量的话，ts就会对多余的字段进行类型检查
// interface List { // 定义接口
//   id: number;
//   name: string;
// }
// interface Result {// 定义接口
//   data: List[]
// }

// function render(result: Result) {
//   result.data.forEach((value) => {
//       console.log(value.id, value.name)
//   })
// }
// // let result = {
// //   data: [
// //       {id: 1, name: 'A', sex: 'male'}, // 多了一个 sex: 'male'
// //       {id: 2, name: 'B'}
// //   ]
// // }
// render({
//   data: [
//       {id: 1, name: 'A', sex: 'male'}, // 多了一个 sex: 'male'
//       {id: 2, name: 'B'}
//   ]
// })


// 四、对象类型的接口，入参和定义的接口不一致
// ts允许这种情况的发生，因为ts采用了一种鸭式辩型法，这是一种动态语言类型风格
// 如果一只鸟，看起来像鸭子，游起来像鸭子，那么这子鸟就可以被认为是鸭子
// 所以我们只要传入的对象满足接口的必要条件，那么就是被允许的，即使传入多余的字段，也可以通过类型检查
// 这种情况有一种例外，如果我们直接传入对象字面量的话，ts就会对多余的字段进行类型检查
// 绕过这种类型检查有三种，1、将对象字面量赋值给一个变量
// interface List { // 定义接口
//   id: number;
//   name: string;
// }
// interface Result {// 定义接口
//   data: List[]
// }

// function render(result: Result) {
//   result.data.forEach((value) => {
//       console.log(value.id, value.name)
//   })
// }
// // 1、将对象字面量赋值给一个变量，绕过ts就对多余的字段进行类型检查
// let result = {
//   data: [
//       {id: 1, name: 'A', sex: 'male'}, // 多了一个 sex: 'male'
//       {id: 2, name: 'B'}
//   ]
// }
// render(result)


// 五、对象类型的接口，入参和定义的接口不一致
// ts允许这种情况的发生，因为ts采用了一种鸭式辩型法，这是一种动态语言类型风格
// 如果一只鸟，看起来像鸭子，游起来像鸭子，那么这子鸟就可以被认为是鸭子
// 所以我们只要传入的对象满足接口的必要条件，那么就是被允许的，即使传入多余的字段，也可以通过类型检查
// 这种情况有一种例外，如果我们直接传入对象字面量的话，ts就会对多余的字段进行类型检查
// 绕过这种类型检查有三种，1、将对象字面量赋值给一个变量，2、使用类型断言
// interface List { // 定义接口
//   id: number;
//   name: string;
// }
// interface Result {// 定义接口
//   data: List[]
// }

// function render(result: Result) {
//   result.data.forEach((value) => {
//       console.log(value.id, value.name)
//   })
// }
// // 1、将对象字面量赋值给一个变量，绕过ts就对多余的字段进行类型检查
// // let result = {
// //   data: [
// //       {id: 1, name: 'A', sex: 'male'}, // 多了一个 sex: 'male'
// //       {id: 2, name: 'B'}
// //   ]
// // }

// // 类型断言方式1 推荐使用这种断言
// render({
//   data: [
//       {id: 1, name: 'A', sex: 'male'}, // 多了一个 sex: 'male'
//       {id: 2, name: 'B'}
//   ]
// } as Result ) // 2、使用类型断言 as 对象接口类型 明确告诉编译器，我们知道这个对象的类型就是Result，这样编译器就会绕过类型检查

// // 类型断言方式2 推荐使用这种断言，因为在react中会产生歧义
// render(<Result>{ // 2、使用类型断言 <对象接口类型>  明确告诉编译器，我们知道这个对象的类型就是Result，这样编译器就会绕过类型检查
//   data: [
//       {id: 1, name: 'A', sex: 'male'}, // 多了一个 sex: 'male'
//       {id: 2, name: 'B'}
//   ]
// }) 



// 六、对象类型的接口，入参和定义的接口不一致
// ts允许这种情况的发生，因为ts采用了一种鸭式辩型法，这是一种动态语言类型风格
// 如果一只鸟，看起来像鸭子，游起来像鸭子，那么这子鸟就可以被认为是鸭子
// 所以我们只要传入的对象满足接口的必要条件，那么就是被允许的，即使传入多余的字段，也可以通过类型检查
// 这种情况有一种例外，如果我们直接传入对象字面量的话，ts就会对多余的字段进行类型检查
// 绕过这种类型检查有三种，1、将对象字面量赋值给一个变量，2、使用类型断言，3、使用字符串索引签名
// interface List { // 定义接口
//   id: number;
//   name: string;
//   [x: string]: any; // 3、使用字符串索引签名，含义是用任意的字符串去索引接口List可以得到任意的结果，这样接口List就可以支持多个属性了，[变量: 类型]: 返回值
// }
// interface Result {// 定义接口
//   data: List[]
// }

// function render(result: Result) {
//   result.data.forEach((value) => {
//       console.log(value.id, value.name)
//   })
// }
// // 1、将对象字面量赋值给一个变量，绕过ts就对多余的字段进行类型检查
// // let result = {
// //   data: [
// //       {id: 1, name: 'A', sex: 'male'}, // 多了一个 sex: 'male'
// //       {id: 2, name: 'B'}
// //   ]
// // }

// // 类型断言方式1 推荐使用这种断言
// // render({
// //   data: [
// //       {id: 1, name: 'A', sex: 'male'}, // 多了一个 sex: 'male'
// //       {id: 2, name: 'B'}
// //   ]
// // } as Result ) // 2、使用类型断言 as 对象接口类型 明确告诉编译器，我们知道这个对象的类型就是Result，这样编译器就会绕过类型检查

// // // 类型断言方式2 推荐使用这种断言，因为在react中会产生歧义
// // render(<Result>{ // 2、使用类型断言 <对象接口类型>  明确告诉编译器，我们知道这个对象的类型就是Result，这样编译器就会绕过类型检查
// //   data: [
// //       {id: 1, name: 'A', sex: 'male'}, // 多了一个 sex: 'male'
// //       {id: 2, name: 'B'}
// //   ]
// // }) 

// render({ 
//   data: [
//       {id: 1, name: 'A', sex: 'male'}, // 多了一个 sex: 'male'
//       {id: 2, name: 'B'}
//   ]
// }) 



// 七、对象类型的接口，可选属性
// interface List {
//   id: number;
//   name: string;
//   age?: number; // 可选属性
// }
// interface Result {
//   data: List[]
// }

// function render(result: Result) {
//   result.data.forEach((value) => {
//       console.log(value.id, value.name)
//       if (value.age) {
//           console.log(value.age)
//       }
//   })
// }
// let result = {
//   data: [
//       {id: 1, name: 'A', sex: 'male'},
//       {id: 2, name: 'B', age: 10}
//   ]
// }
// render(result)


// 八、对象类型的接口，只读属性
// interface List {
//   readonly id: number; // 只读属性
//   name: string;
// }
// interface Result {
//   data: List[]
// }

// function render(result: Result) {
//   result.data.forEach((value) => {
//       console.log(value.id, value.name)
//       value.id++ // 只读属性不允许被修改
//   })
// }
// let result = {
//   data: [
//       {id: 1, name: 'A', sex: 'male'},
//       {id: 2, name: 'B', age: 10}
//   ]
// }
// render(result)

// 九、当不确定一个接口中有多少个属性的时候，就可以使用可索引类型的接口，可索引类型的接口可以用数字去索引，也可以用字符串去索引
// 定义用数组索引的接口（索引就是下标）
interface StringArray {
  [index: number]: string // 签名，意思是，用任意的的数字去索引接口StringArray都会得到string，相当于声明了字符串类型的数组，如下chars变量
}
let chars: StringArray = ['a', 'b']

// 使用字符串去索引接口
// interface Names {
//   [x: string]: string; // 含义是使用任意字符串去索引接口Names，得到的是string
//   // y: number; // 上面这样这样声明后，我们就不能去声明一个number类型了
//   [z: number]: string; // 索引类型是可以混用的，这样既可以使用 string去索引Names也可以使用number
//   // 需要注意的使用，数字索引的返回值一定是需要是字符串索引返回值的子类型，这是用JavaScript会进行类型转换将z: number的返回值转为string，这样可以保持类型的兼容性
//   // 也就是说，使用将数字索引的返回值改为number，那么就不兼容了，需要将string索引的返回值改为any，也可以说，如果有多个索引，那么需要有一个是any，包含所有索引类型，如下
// }
interface Names {
  [x: string]: any; 
  [z: number]: number; 
}


// 十、使用接口定义函数类型
// let add: (x: number, y: number) => number
// interface Add {
//     (x: number, y: number): number
// }
// type Add = (x: number, y: number) => number
// let add: Add = (a, b) => a + b


// 十一、混合类型的接口
// 含义是一个接口即可以定义一个函数，也可以像对象一样拥有拥有属性和方法
interface Lib {
  (): void; // 一个函数，没有返回值也没有参数
  version: string; // 属性，类型是string
  doSomething(): void; // 一个方法
}

// 使用上述接口
// 通过下述方式，已经实现了一个接口，但是缺点是向全局暴露了一个变量lib
let lib:Lib = (() => {}) as Lib // 实现一个函数，增加断言，告诉编译器这个是我们需要实现的接口
    lib.version = '1.0.0' // 增加属性
    lib.doSomething = () => {} // 增加方法

// 为了现实工厂化，我们封装为一个函数
function getLib() {
  let lib:Lib = (() => {}) as Lib
  lib.version = '1.0.0'
  lib.doSomething = () => {}
  return lib;
}

// 使用函数
let lib1 = getLib()
lib1()
let lib2 = getLib()
lib2.doSomething()
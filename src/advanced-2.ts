// 定义一个对象
let obj = {
  a: 1,
  b: 2,
  c: 3
}
// 定义一个方法获取对象值数组
/* function getValues(obj: any, keys: string[]) {
    return keys.map(key => obj[key])
}
console.log(getValues(obj, ['a', 'b'])) //  [1, 2]
console.log(getValues(obj, ['d', 'e'])) // 获取对象中不存在的属性值，不会报错，[undefined, undefined] */

// 为了让ts针对这种情况报错提示，使用索引类型
// 几个概念
// 1，索引类型的查询操作符 keyof T 表示类型T的所有公共属性的字面量的联合类型
// keyof T
// 例子，定义一个接口
interface Obj {
  a: number;
  b: string;
}
// 定义一个变量key，类型是 keyof Obj，也就是key的类型是a和b的字面量联合类型
let key: keyof Obj

// 2，索引返回操作符 T[K] ，表示对象T的属性K所代表的类型
// T[K]
// 定义一个变量value，类型是Obj['a']，也就是value的类型是Obj对象中属性a的类型number
let value: Obj['a']

// 3，泛型约束
// T extends U



// 改造getValues函数
// 1，改为泛型函数
// 2，keys的元素必须是obj的属性
// function getValues(obj: any, keys: string[]) {
//   return keys.map(key => obj[key])
// }

// 1，定义泛型变量T约束obj
// 2，定义泛型变量K约束keys数组的元素  K[]
// 3，泛型变量K增加类型约束，让其继承obj对象所有属性的字面量的联合类型 a｜b
// 4，函数的返回值首先是[]，数组元素的类型是obj中属性对应的类型 T[K]
// 5，这样，就通过索引类型，将getValues函数改造完成，ts类型检查就发挥作用
// 如果指定一个不在obj对象对象的属性时，ts会报错提示
function getValues<T, K extends keyof T>(obj: T, keys: K[]): T[K][] {
  return keys.map(key => obj[key])
}
console.log(getValues(obj, ['a', 'b']))
// console.log(getValues(obj, ['d', 'e'])) // 报错提示，不能将类型“"d"”分配给类型“"a" | "b" | "c"”，  不能将类型“"e"”分配给类型“"a" | "b" | "c"”

// 总结：索引类型可以实现对对象属性的查询和访问，然后再可以配合泛型约束，就可以建立起对对象，对象属性以及属性值的约束关系
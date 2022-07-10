// 定义一个接口
interface Obj {
  a: string;
  b: number;
}
// 定义一个类型别名，将接口Obj所有的属性变为只读
// 这个类型别名的值时ts内置的泛型接口Readonly<接口类型>
type ReadonlyObj = Readonly<Obj>
// 结果是
// type ReadonlyObj = {
//   readonly a: string;
//   readonly b: number;
// }

// Readonly的实现方法
// type Readonly<T> = { readonly [P in keyof T]: T[P]; }
// Readonly是一个泛型接口，而且是可索引的泛型接口
// 索引签名是P in keyof T 其中keyof T是索引查询操作符，代表类型T所有属性的联合类型，P in相当于执行了一次 for in操作，会把变量P依次绑定T的所有属性上
// 索引签名的返回值是一个索引返回操作符T[P]，这里代码属性P所指定的类型
// 然后通过Readonly将所有属性变成了只读


// ts内置了其他类型
// 把接口的所有属性变成可选
type PartialObj = Partial<Obj>
// 实现方法
// type Partial<T> = { [P in keyof T]?: T[P] | undefined; }

// 抽取接口的子集
// type PickObj = Pick<Obj, 'a' | 'b'>
// 实现方法
// type Pick<T, K extends keyof T> = { [P in K]: T[P]; }
// 有两个泛型变量，T代表我们要抽取的对象，K有一个泛型约束，只能是T的属性字面量的联合类型

// 总结：Readonly，Partial，Pick官方称为同态，意思是只会作用于T属性，不会引入新的属性

// Record这个会创建新的属性
// type RecordObj = Record<'x' | 'y', Obj>
// Record的第一个参数是我们预定于的新属性，不来自Obj
// 参数二是我们已知的类型Obj
// 这种类型就是非同态类型

// 那么映射类型本质上是一种预先定义的泛型接口，通常会接口索引类型获取对象的属性，属性值，从而将对象映射成我们想要的结构
// 一、条件类型是一种由条件表达式决定的类型
// T extends U ? X : Y
// 如果类型T可以被赋值给类型U，结果类型就是类型X，否则是类型Y
// 条件类型使得类型具有不唯一性，增加了语言的灵活性

// 条件类型的例子
// 定义TypeName类型别名，是一种条件类型，而且是条件类型的嵌套
// 会依次判断T的类型，返回不同的字符串
type TypeName<T> =
    T extends string ? "string" :
    T extends number ? "number" :
    T extends boolean ? "boolean" :
    T extends undefined ? "undefined" :
    T extends Function ? "function" :
    "object";

// 定义类型T1是条件类型，传入string，更加上述的条件类型，T1就是字面量类型"string"
type T1 = TypeName<string>
// T2就是字面量类型，值时"object"
type T2 = TypeName<string[]>




// 二、分布式条件类型
// 含义，如果类型T是联合类型的情况下，结果类型会变成多个条件类型的联合类型

// (A | B) extends U ? X : Y // 类型T是联合类型(A | B)，结果类型会变成多个条件类型的联合类型，如下
// (A extends U ? X : Y) | (B extends U ? X : Y) 拆解上面得到这个联合类型
type T3 = TypeName<string | string[]> // 参数是分布式条件类型，就会被推断为type T3 = "string" | "object"联合类型

// 利用分布式条件类型的特性，帮助我们实现一些类型过滤
// 定义一个类型Diff，参数是T, U，如果T 可以赋值给 U，结果就是never类型，否则是T类型
type Diff<T, U> = T extends U ? never : T 
// 举个例子
// 定义类型T4，通过ts处理得到第一个参数的不在第二个参数里面的联合类型，type T4 = "b" | "c"
type T4 = Diff<"a" | "b" | "c", "a" | "e">
// 将上面这个拆解成下面这个式子（多个条件类型的联合类型）
// Diff<"a", "a" | "e"> | Diff<"b", "a" | "e"> | Diff<"c", "a" | "e"> // 1，拆解式子
// never | "b" | "c"// 2，按照拆解式子的执行，"a"可以被赋值给"a" | "e"，所以结果是never；"b"不可以被赋值给"a" | "e"，所以结果是"b"；"c"不可以被赋值给"a" | "e"，所以结果是"c"
// "b" | "c" // 3，再执行2，中的联合类型，那么never的联合类型，结果是 "b" | "c"

// 结果：Diff的作用是，可以从类型T中过滤掉可以赋值给类型U的类型


// 扩展
// 从类型中除去一些不需要的类型
// 从类型T中取出null和undefined类型
type NotNull<T> = Diff<T, null | undefined>
type T5 = NotNull<string | number | undefined | null> // 结果是type T5 = string | number


// 官方为我们预定义实现了
// Exclude<T, U> // 从类型T中过滤掉可以赋值给类型U的类型，和上述Diff一致
// NonNullable<T> // 从类型T中取出null和undefined类型，和上述NotNull一致

// Extract<T, U> // 从类型T中抽取出可以赋值给类型U的类型
type T6 = Extract<"a" | "b" | "c", "a" | "e"> // 结果，type T6 = "a"

// ReturnType<T> // 可以获取一个函数返回值的类型，参数是一个函数
type T8 = ReturnType<() => string> // 结果，type T8 = string
// 实现
// type ReturnType<T extends (...args: any) => any> = T extends (...args: any) => infer R ? R : any
// 参数T可以被赋值给一个函数，函数可以有任意的参数，返回值类型也是任意的
// 由于函数的返回值是不确定的，所以使用了infer关键字，infer表示待推断，或者是延迟推断，需要根据实际的情况确定
// 如果实际的情况返回类型R，那么结果类型就是R，否则返回值类型就是any
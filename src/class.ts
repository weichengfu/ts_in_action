// 一、定义一个es6类，为成员属性加上类型注解
// 注意点
// 1，无论是无论在js还是ts中，类成员的属性都是实例属性，而不是原型属性
// 而类成员的方法都是实例方法
/* class Dog {
  constructor(name: string) { // 给构造函数的参数增加类型注解，返回值是这个类本身（Dog）
      this.name = name
  }
  name:string // 给成员属性增加类型注解
  run() {} // 方法的默认返回值是void
} */

/* console.log(Dog.prototype) // 打印类的原型，不包含类属性的（name）
{constructor: ƒ, run: ƒ}
constructor: class Dog
run: ƒ run()
[[Prototype]]: Object */


/* 
// 二、实例化方法
// 1，类成员的属性（name）都是实例上，而不在原型上
// 2，实例的属性必须有初始值
class Dog {
  constructor(name: string) { 
  }
  name:string = 'dog' // 有初始值
  name1?:string = 'dog' // 也可以是有初始值可选属性
}

// 或者在构造函数中初始化 如上this.name = name
let dog = new Dog('wangwang')
console.log(dog) 

Dog {name: 'wangwang'}
name: "wangwang"
[[Prototype]]: Object
constructor: class Dog
run: ƒ run()
[[Prototype]]: Object
*/



// 三、类的继承
// 通过extends关键字实现继承
/* class Husky extends Dog {
  constructor(name: string, color: string) {
      // 派生类的构造函数必须包含super调用，super代表父类的实例
      // 父类Dog构造函数有一个参数name，那么super也要传入name
      super(name) 
      this.color = color // 需要在super调用
  }
  color: string
} */



// 四、类的成员修饰符，这是ts对js的一种扩展
// 修饰符有public，类的所有属性都是public，含义是对所有人都是可见的，默认可以不写，也可以显示声明
// 类的私有成员private，只能在类的内部调用，不能被类的实例调用，也不能被类的子类调用
// 也可以给构造函数增加私有成员属性，这个类不能被实例化，也不能被继承
/* class Dog {
  //  private constructor(name: string) {  // 构造函数增加私有成员属性，后面new Dog('wangwang')和继承class Husky extends Dog都会报错
   constructor(name: string) { 
      this.name = name
  }
  public name:string // 显示声明public
  private pri() {} // 类的私有成员
  run() {} 
}

let dog = new Dog('wangwang')
// dog.pri() // 报错，属性“pri”为私有属性，只能在类“Dog”中访问。

// 子类
class Husky extends Dog {
  constructor(name: string) {
      super(name) 
      // this.pri() // 报错，属性“pri”为私有属性，只能在类“Dog”中访问。
  }
}  */



// 五、受保护成员 protected
// 只能在类或者子类中访问，而不能在类的实例中访问
// constructor构造函数也可以声明protected类型，表示这个类不能被实例化，只能被继承，相当于声明了一个基类
/* class Dog {
   constructor() { 
  }
  protected pro() {} // 受保护成员
}

let dog = new Dog()
// dog.pro() // 报错，属性“pro”受保护，只能在类“Dog”及其子类中访问，不能在类的实例中访问。

class Husky extends Dog {
  constructor() {
      super() 
      this.pro() // 可以在子类中调用受保护成员
  }
}   */



// 六、只读属性 readonly
// 属性可以声明为只读属性，这个属性不能被修改，只读属性必须被初始化和实例属性一致
/* class Dog {
  constructor() {}
  readonly legs: number = 4
} */



// 七、除了类的成员可以添加修饰符外，构造函数的参数也可以添加修饰符，将参数自动变成实例的属性，这样可以省略在类中的定义
/* class Dog {
   constructor(name: string) { 
      this.name = name
  }
  public name:string // 显示声明public
  private pri() {} // 类的私有成员
  run() {} 
}

let dog = new Dog('wangwang')

// 子类
class Husky extends Dog {
  constructor(name: string, public color:string) { // public将参数color自动变成实例的属性
      super(name) 
      this.color = color
  }
  // color:string // 可以省略在类中的定义，代码可以更加简洁
} */



// 八、类的静态成员 static
// 类的静态成员只能通过类名来调用
/* class Dog {
  constructor(name: string) { 
     this.name = name
 }
 public name: string = 'dog'
 static food: string = 'bones' // 静态成员
}
let dog = new Dog('wangwang')
console.log(Dog.food) // 通过类名来调用
// console.log(dog.food) // 报错，通过实例来调用

// 类的静态成员也可以被继承
class Husky extends Dog {
  constructor(name: string, public color: string) {
      super(name)
      this.color = color
  }
}

console.log(Husky.food) // 子类可以继承了父类的静态成员 */


// 九、抽象类 abstract
// 抽象类只能被继承，不能被实例化的类
// 抽象类好处是可以抽离出一些事物的共性，有利于代码的复用和扩展
// 定义抽象类
/* abstract class Animal {
    // 抽象类 定义具体的方法，子类就不用定义，可以实现方法的复用
    eat() {
        console.log('eat')
    }
    // 抽象类中可不指定方法的具体实现，这就构成了抽象方法
    // 好处是，子类中有更好的实现，没有必要在父类中实现
    // 注意，定义的抽象方法不去实现，但继承的子类必须去实现
    abstract sleep(): void
}
// let animal = new Animal() // 报错，抽象类不能被实例化。

class Dog extends Animal {
  constructor(name: string) {
      super()
      this.name = name
  }
  name:string
  run() {}
  // 在子类中实现抽象类中的抽象方法
  sleep() {
    console.log('Dog sleep')
  }
}
let dog = new Dog('wangwang')
dog.eat() // 子类实例中调用父类的方法 */


// 十、抽象类多态
// 所谓多态是在父类中定义抽象方法，在多个子类中对这个抽象方法有不同的实现（继承的子类必须去实现这个方法），在程序运行的时候，会根据不同的对象执行不同的操作，这样就实现了运行时的绑定
// 定义抽象类
/* abstract class Animal {
    // 定义抽象方法
    abstract sleep(): void
}
// 抽象类的子类
class Dog extends Animal {
  // 在子类中实现抽象类中的抽象方法
  sleep() {
    console.log('Dog sleep')
  }
}
let dog = new Dog()

// 抽象类的子类
class Cat extends Animal {
  sleep() {
      console.log('Cat sleep')
  }
}
let cat = new Cat()

// 定义变量数组，
let animals: Animal[] = [dog, cat]
animals.forEach(i => {
  i.sleep()
})

// 输出
// Dog sleep
// Cat sleep */



// 十一、特殊的ts类型，this类型
class Workflow {
  step1() {
      // 类的成员方法可以返回一个this，这样可以实现链式调用 
      return this 
  }
  step2() {
      return this
  }
}
// 实例化对象链式调用方法
// new Workflow().step1().step2()



// 在继承的时候，this也可以实现多态
// this可以是父类型，也可以是子类型
class MyFlow extends Workflow {
  next() {
      return this
  }
}
// 可以调用子类的方法，也可以调用父类的方法，保持了父类和子类接口调用的连贯性
new MyFlow().next().step1().next().step2()
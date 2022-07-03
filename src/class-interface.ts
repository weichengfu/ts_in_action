// 一、类类型接口
// 定义一个类类型接口，可以约束成员可以有哪些属性，以及他们的类型
/* interface Human {
  name: string;
  eat(): void; // 方法
}
// 使用关键字implements实现定义的接口
// 注意，类实现接口的时候，必须实现接口中声明的所有属性，如果实现属性不足则报错
// 类可以定义自己的属性，非接口属性
// 接口只能约束类的共有成员public，不能约束私有成员private
// 接口不能约束类的构造函数，如下
// interface Human {
//   new (name:string):void // 约束类的构造函数
//   name: string;
//   eat(): void;
// }
class Asian implements Human {
  constructor(name: string) {
      this.name = name;
  }
  name: string
  // private name: string // 报错，接口不能约束私有成员private
  eat() {}
  age: number = 0
  sleep() {} // 类可以定义自己的属性
} */


// 二、接口的继承
// 接口可以像类一样相互继承，并且一个接口能够继承多个接口
// 使用关键字 extends
// 定义一个Human接口
/* interface Human {
  name: string;
  eat(): void; // 方法
}
// Man接口继承Human
interface Man extends Human {
  run(): void // 自己的方法
}

// 定义一个Child接口
interface Child {
  cry(): void
}

// Boy接口同时继承 Man和Child接口，使用逗号分开
interface Boy extends Man, Child {}
// 实现Boy接口
let boy: Boy = {
  name: '',
  run() {},
  eat() {},
  cry() {}
}
// 总之，接口的继承可以抽离出可重用的接口，也可以将多个接口合并成一个接口 */



// 三、接口继承类
// 相当于接口将类的成员抽象了出来，也就是有类的成员结构，而没有具体的实现
// 定义一个类
/* class Auto {
  state = 1 // 公共属性
}
// 接口继承Auto这个类，这个接口中就隐含了state属性，要实现这个接口，只需要类的成员具有state属性即可
interface AutoInterface extends Auto {

}
// 实现AutoInterface接口的类
class C implements AutoInterface {
  state = 1
}


// Auto的子类也可以实现AutoInterface接口
// 定义一个Auto的子类Bus，用Bus实现AutoInterface接口
// 在这个类中不需要实现state属性，Auto子类自然继承就继承state属性
class Bus extends Auto implements AutoInterface {

} */

// 四、注意点，接口在继承类的成员的时候，不仅抽离了公共成员，而且抽离了私有成员和受保护的成员
// 定义一个类
// class Auto {
//   state = 1 // 公共属性
//   private state2 = 1 // 定义私有成员
// }
// interface AutoInterface extends Auto {

// }
// // 实现AutoInterface接口的类
// class C implements AutoInterface { // 报错，类“C”错误实现接口“AutoInterface”。 类型 "C" 中缺少属性 "state2"，但类型 "Auto" 中需要该属性。
//   state = 1
// }
enum Type { Strong, Week }
// 定义两个类
// Java类
class Java {
    helloJava() { // 打印方法
        console.log('Hello Java')
    }
    java: any
}
// JavaScript类
class JavaScript {
    helloJavaScript() { // 打印方法
        console.log('Hello JavaScript')
    }
    js: any
}

// 定义一个函数
function getLanguage(type: Type, x: string | number) {
  // 判断类型是强类型就返回Java类的实例 是弱类型就执行JavaScript类的实例 
    let lang = type === Type.Strong ? new Java() : new JavaScript();
    
    // 1，问题，ts无法判断它是那种类型的
    // if (lang.helloJava) { // 报错，类型“Java | JavaScript”上不存在属性“helloJava”。类型“JavaScript”上不存在属性“helloJava”。 
    //     lang.helloJava(); 
    // } else {
    //     lang.helloJavaScript();
    // }

    // 2，使用类型断言解决问题1
    // 因为我们不知道成员运行的时候传入什么参数，所以需要在每一处加上类型断言，但不是理性的解决方案，代码的可读性差
    // 那么类型保护机制就是用于解决这个问题的，可以提前对类型进行预判
    if ((lang as Java).helloJava) {
        (lang as Java).helloJava();
    } else {
        (lang as JavaScript).helloJavaScript();
    }

    // 类型保护：ts能够在特定的区块只能够保证变量属于某种确定的类型，可以在这个区块中放心地引用此类型的属性，或者或者调用此类型的方法
    // 四种创建这种保护区块的方法
    // 1，使用instanceof关键字
    // instanceof关键字可以判断这个实例是否属于某个类
    if (lang instanceof Java) { // 可以保证lang是Java的实例
        lang.helloJava()
    } else {
        lang.helloJavaScript()
    }

    // 2，使用in关键字
    // in关键字可以判断某个关键字是否属于某个对象
    if ('java' in lang) {
        lang.helloJava()
    } else {
        lang.helloJavaScript()
    }

    // 3，使用typeof关键字
    // typeof关键字可以判断一个基本类型
    if (typeof x === 'string') {
        console.log(x.length)
    } else {
        console.log(x.toFixed(2))
    }

    // 4，创建一个类型保护函数，来判断对象的类型
    if (isJava(lang)) {
        lang.helloJava();
    } else {
        lang.helloJavaScript();
    }

    return lang;
}

getLanguage(Type.Week, 1)


// 4，创建一个类型保护函数，来判断对象的类型
function isJava(lang: Java | JavaScript): lang is Java { // 函数的返回值是一种特殊的返回值 参数 is 类型 ，这种返回值叫类型为词
    return (lang as Java).helloJava !== undefined
}

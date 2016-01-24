// This
// JavaScript的this总是指向一个对象

/**
 * 1.作为对象的方法调用
 *
 * 作为对象方法调用时，this指向该对象。
 */

var obj = {
  a: 1,
  getA: function() {
    console.log(this === obj);
    console.log(this.a);
  }
};

obj.getA();

/**
 * 2.作为普通函数调用
 *
 * 不作为对象属性调用时,this必须指向一个对象。那就是全局对象。
 */

window.name = 'globalName';

var getName = function() {
  console.log(this.name);
};

getName();

var myObject = {
  name: "ObjectName",
  getName: function() {
    console.log(this.name)
  },
  // otherObject则印证了，在哪个对象里调用，就是哪个对象的this值
  otherObject: {
    name: "OtherName",
    getName: this.getName
  }
};

myObject.otherObject.getName()
  // 这里实质上是把function() {console.log(this.name)}
  // 这句话赋值给了theName。thisName在全局对象中调用，自然读取的是全局对象的name值
var theName = myObject.getName;

theName();

/**
 * 3.作为构造器调用
 * 
 * 作为构造器调用时，this指向返回的这个对象。
 */

var myClass = function() {
  this.name = "Lxxyx";
  // 加入return时，则返回的是别的对象。this不起作用。
  // return {
  //   name:"Return"
  // }
};

var obj = new myClass();
obj.name; // Lxxyx

/**
 * 4.call,apply调用
 *
 * 
 */

document.getElementById = (function(func) {
  return function() {
    return func.apply(document, arguments);
  }
})(document.getElementById);

var getId = document.getElementById;

var div = getId('div')

// 此时的getId为function() {
//   return func.apply(document, arguments);
// }
// 当 var div = getId('div')时，实质是
// div = document.getElementById.apply(document,"div")
// apply的作用在于把document传入作为this
// 
// 我的疑惑在于传入的func是document.getElementById，应当是对象的属性，不需要加apply。
// 但实际上,var getId = document.getElementById和var theName = myObject.getName没有区别。
// 因为此时getId或者theName获取到的，都只是函数代码，但是this的指向却是全局对象。
// 所以要用apply来改变作用对象。

// Call和Apply

/**
 * 1.Call和Apply的区别
 *
 * Call和Apply的用途一样。
 * Call：第一个参数为this的指向，要传给函数的参数得一个一个的输入。
 * Apply：第一个参数为this的指向，第二个参数为数组，一次性把所有参数传入。
 *
 * 如果第一个参数为null,则this指向调用的本身。
 */

var name = "WindowName"

var func = function() {
  console.log(this.name)
};

func();

var obj = {
  name: "Lxxyx",
  getName: function() {
    console.log(this.name)
  }
};

obj.getName.apply(func) // WindowName
func.apply(obj) // Lxxyx

// 别的用途，替代确定的对象

Math.max.apply(null, [1, 3, 2]) // 3

/**
 * 2.Call和Apply的用途
 *
 * ① ：改变this指向
 * ② ：bind函数的使用
 * ③ ：借用其它对象的方法
 */

var A = function(name) {
  this.name = name;
};

var B = function() {
  // 前面是调用谁的，后面是改变给谁
  A.apply(this, arguments);
};

B.prototype.getName = function() {
  console.log(this.name);
};

var b = new B('Lxxyx');
b.getName(); // Lxxyx

(function(a, b) {
  console.log(arguments) // 1,2
    // apply必须用类数组的方式
    // 且调用时候要加上prototype
  Array.prototype.push.call(arguments, 3);
  console.log(arguments) // 1,2,3
});

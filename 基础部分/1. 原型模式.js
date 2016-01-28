var Plane = function() {
  this.blood = 100;
  this.attackLevel = 1;
  this.defendLevel = 1;
};

var plane = new Plane();
plane.blood = 500;
plane.attackLevel = 10;
plane.defendLevel = 7;

var clonePlane = Object.create(plane);
console.log(clonePlane);
console.log(clonePlane.blood)

/**
 * 克隆对象的函数，不支持Create方法时调用后续函数
 * @param  {Object} obj 被克隆的对象
 * @return {Object}     克隆后的对象
 */
Object.create = Object.create || function(obj) {
  // 将F设置为空的构造函数
  var F = function() {};
  // 让F的原型指向传入的obj，构造出原型链，从而达到继承的目的。
  F.prototype = obj;

  // 返回被创造的对象
  return new F();
};

// Notes

/*
  设计模式的作用在于，把程序中变化的部分和不变的部分分开。
  让对象内部的实现对外部隐藏，从而实现修改内部源码，但不影响调用其Api部分的实现。
 */

/*
 * 要得到一个对象，不是通过实例化类，而是找到一个对象并且克隆它。
 * 所以javascript中，Object是根对象
 */

// 克隆函数的实例
// 

function Person(name) {
  this.name = name;
};

Person.prototype.getName = function() {
  if (this.name === undefined) {
    return "Hello No Name"
  }
  return this.name;
};

var objFactory = function() {

  // arguments的Person去哪儿了
  // Person是函数，赋值给Constructor了
  var obj = new Object();
  console.log(arguments)

  // shift() 方法用于把数组的第一个元素从其中删除，并返回第一个元素的值。
  // 这儿的精髓在于空数组要移除第一个元素，但是没有。于是用call调用arguments，从而把构造函数赋值给Construcir
  var Construtor = [].shift.call(arguments);
  // console.log(typeof Construtor);


  // 之前是obj._proto_，这样只是把Construtor的原型赋值给某个属性
  // 这样getName自然就是undefined。
  // 这样做是为了复写chrome的__proto__属性，在chrome中__proto__才是真正的原型链。
  // javascript给对象提供了__proto__属性，指向原型对象。
  obj.__proto__ = Construtor.prototype;
  // 如果设置为obj.prototype = Construtor.prototype;实际上只是这个对象的某个属性是一个构造函数，构造函数并没有接到
  // name的值，所以返回Hello No Name
  // apply的第一个参数，为指定函数体内this的指向
  // 第二个参数则为要传过去的参
  var ret = Construtor.apply(obj, arguments);

  return typeof ret === "object" ? ret : obj;
};

var a = objFactory(Person, "Lxxyx");

a.getName() // 会报错

// 当A和B为构造函数时，则可以把原型指向别处。
// 如果A只是实例化的对象，那么实质上还是之前对象的实例。而非当前对象。
// 比如上文中obj只是person的对象。
var A = function() {};

A.prototype.getName = function() {
  console.log(1)
}

var B = function() {};
B.prototype = new A();

var b = new B();

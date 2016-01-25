/**
 * 1.闭包
 */

// 最简单的演示
var func = function() {
  var a = 1;
  return function() {
    a++;
    console.log(a);
  }
};

// 因为当执行f = func时，返回了一个匿名函数。
// 匿名函数还保持着对局部变量a的引用
// 所以a没被销毁，这就是闭包
var f = func();

f(); // 2
f(); // 3
f(); // 4

var Type = {};

for (var i = 0, type; type = ['String', 'Array', 'Number'][i++];) {
  (function(type) {
    Type['is' + type] = function(obj) {
      return Object.prototype.toString.call(obj) === '[object ' + type + ']';
    }
  })(type)
};

// 更多作用
// 1. 封装变量

// 作用为返回传入参数的乘积
var mult = function() {
  var a = 1;
  for (var i = 0, l = arguments.length; i < l; i++) {
    a = a * arguments[i];
  }
  return a;
};

// 改进版
var cache = {};
var mult = function() {
  // join方法会把数组中的所有元素放入一个字符串
  // 通过给定的字符串进行分隔
  var args = Array.prototype.join.call(arguments, ',');
  // 这样的话是不行的，因为arguments不存在这种方法，所以得去Array借用
  // var args = arguments.join(',')
  if (cache[args]) {
    return cache[args];
  }

  var a = 1;
  for (var i = 0, l = arguments.length; i < l; i++) {
    a = a * arguments[i];
  }

  return cache[args] = a;
};

var mult = (function() {
  var cache = {};
  return function() {
    var args = Array.prototype.join.call(arguments, ',');

    if (cache[args]) {
      return cache[args];
    }

    var a = 1;
    for (var i = 0, l = arguments.length; i < l; i++) {
      a = a * arguments[i];
    }

    return cache[args] = a;
  }
})();

// b=a,return b这样的顺序
(function(a, b) {
  return a = b;
})(1, 4)

var mult = function() {
    var cache = {};
    var caculate = function() {
      var a = 1;

      for (var i = 0, l = arguments.length; i < l; i++) {
        a = a * arguments[i];
      }

      return a;
    };

    return function() {
      var args = Array.prototype.join.call(arguments, ',');

      if (cache[args]) {
        return cache[args];
      }

      // 这样做的话，传入caculate函数的参数是个数组，
      // arguments[0] = [1,2]，实际上只有一个参数
      // 当a = a * arguments[i]，实际上是a*一个数组
      // 自然返回NaN
      // return cache[args] = caculate(arguments);
      // 
      // apply则可以把参数以数组的方式传进去，这个函数接到参数后会自动解包成变量
      // 这样arguments就等于传入的arguments。
      return cache[args] = caculate.apply(null,arguments);
    }
  }();
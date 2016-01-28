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
    return cache[args] = caculate.apply(null, arguments);
  }
}();

/**
 * 2. 高级函数
 *
 * 定义: 
 *   1. 函数可以作为参数被传递
 *     * 比如回调函数，就是作为Ajax的参数
 *     * Array.prototype.sort就接受一个函数作为排序的参数
 *   2. 函数可以作为返回值输出
 */


/**
 * ① ：函数作为参数被传递
 */

var appendDiv = function(callback) {
  for (var i = 0; i < 100; i++) {
    var div = document.createElement('div');
    div.innerHTML = i;
    document.body.appendChild(div);

    if (typeof callback === 'function') {
      callback(div)
    }

  }
};

appendDiv(function(node) {
  node.style.display = 'none';
});

/**
 * ② ：函数作为返回值输出
 */

// 第十五章，装饰者模式
Function.prototype.before = function(beforefn) {
  var _self = this;

  return function() {
    beforefn.apply(this, arguments);
    return _self.apply(this, arguments);
  }
};

Function.prototype.after = function(afterfn) {
  var _self = this;

  return function() {
    var ret = _self.apply(this, arguments);
    afterfn.apply(this.arguments);
    return ret;
  }
};

var func = function() {
  console.log(2);
};

func = func.before(function() {
  console.log(1);
}).after(function() {
  console.log(3)
});

// 柯里化函数
// 又称为部分求值
var cost = (function() {
  var args = [];

  return function() {
    if (arguments.length === 0) {
      var money = 0;

      for (var i = 0; i < args.length; i++) {
        money += args[i];
      }

      return money;
    } else {
      [].push.apply(args, arguments);
    }
  }
})();

var curring = function(fn) {
  var args = [];

  return function() {
    if (arguments.length === 0) {
      return fn.apply(this, args);
    } else {
      [].push.apply(args, arguments);
      return arguments.callee;
    }
  }
};

var cost = (function() {
  var money = 0;

  return function() {
    for (var i = 0; i < arguments.length; i++) {
      money += arguments[i];
    }

    return money;
  }
})();

var cost = curring(cost);

cost(100);
cost(200);
cost(300);

console.log(cost())

var func = (function(a) {
  var i = a;
  return function() {
    i++;
    console.log(i);
    return console.log('Hello')
  }
})(1)

Function.prototype.uncurrying = function() {
  // 因为是函数类型，所以这儿的self相当于调用的函数
  // 这样做可以修正this。
  var self = this;
  return function() {
    // 因为会给函数传两个参数，第一个是要指定this的对象
    // 第二个才是apply传入的参数
    console.log(arguments)
    // arguments[0]就是传入的[1,2,3]

    var obj = Array.prototype.shift.call(arguments);
    console.log(obj)
    return self.apply(obj,arguments);
  }
};

var push = Array.prototype.push.uncurrying();

(function() {
  // 因为push这儿传入的是arguments，一个数组作为参数
  // 所以uncurrying收到的参数，也是一个数组。
  push(arguments,4)
})(1,2,3)

Function.prototype.uncurrying = function() {
  var self = this;

  return function() {
    return Function.prototype.call.apply(self,arguments)
  }
};

var push = Array.prototype.push.uncurrying();

// 函数节流

var throttle = function(fn,interval) {
  var _self = fn,
      timer,
      firstTime = true;

  return function() {
    var args = arguments,
        _me = this;

    if (firstTime) {
      _self.apply(_me,args);
      return firstTime = false;
    }

    if (timer) {
      // return false，直接结束函数执行
      return false;
    }

    timer = setTimeout(function() {
      clearTimeout(timer);
      timer = null;
      _self.apply(_me,args)
    },interval||500)
  };
};

window.onresize = throttle(function() {
  console.log(1)
},500)
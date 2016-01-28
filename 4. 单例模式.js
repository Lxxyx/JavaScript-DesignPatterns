/**
 * 4. 单例模式
 *
 * 定义：保证一个类仅有一个实例，并提供一个访问它的全局访问点
 * 用处：比如说我们只需要一个对象，在页面中只有一个浮窗，只会被创建一次。
 */

// 1. 实现单例模式

var Singleton = function(name) {
  this.name = name;
  this.instance = null;
};

Singleton.prototype.getName = function() {
  console.log(this.name)
};

Singleton.getInstance = function(name) {
  if (!this.instance) {
    this.instance = new Singleton(name);
  }
  return this.instance;
};

var a = Singleton.getInstance('Lxxyx')
var b = Singleton.getInstance('Hello')

a.getName() // Lxxyx
b.getName() // Lxxyx，两个是相等的

// 2. 透明单例模式

var CreateDiv = (function() {
  var instance;

  var CreateDiv = function(html) {
    // 在这儿的instance就是一个对象，被new出来的对象。
    // this.html = html 和 this.init();可以利用对象的信息生成div
    // 所以return instance可以保证单实例
    if (instance) {
      return instance;
    }

    this.html = html;
    this.init();
    // 真正的顺序是 
    // 1. instance = this; 
    // 2. return this;
    return instance = this;
  };

  CreateDiv.prototype.init = function() {
    var div = document.createElement('div');
    div.innerHTML = this.html;
    document.body.appendChild(div);
  };

  return CreateDiv;
})();

var CreateDiv = function(html) {
  // 在这儿干了两件事情，不符合单一职责的原则
  this.html = html;
  this.init();
};

CreateDiv.prototype.init = function() {
  var div = document.createElement('div');
  div.innerHTML = this.html;
  document.body.appendChild(div);
};

var ProxySingletonCreateDiv = (function() {
  var instance;
  return function(html) {
    if (!instance) {
      instance = new CreateDiv(html);
    }

    return instance;
  }
})();

var MyApp = {};

MyApp.namespace = function(name) {
  var parts = name.split('.');
  var current = MyApp;

  for (var i in parts) {
    if (!current[parts[i]]) {
      current[parts[i]] = {}
    }
    // 假如数组元素>=2时，则current会成为加入之前的{}，用于扩展命名空间
    current = current[parts[i]]
  }
};
// Chrome打个断点就知道了
MyApp.namespace('event.getName')


// 5.惰性单例模式，重点
// 6.通用惰性单例模式，重点

/**
 * 发布订阅模式
 *
 * 实现：
 *   1.指定好谁当发布者
 *   2.给发布者添加一个缓存列表
 *   3.时间触发时遍历缓存列表
 */

var EventUtil = {
  addEvent: function(element, event, fn) {
    if (element.addEventListener) {
      element.addEventListener(event, fn);
    } else if (element.attachEvent) {
      element.attachEvent('on' + event, fn);
    } else {
      element.
      'on' + event = fn;
    }
  },
  removeEvent: function(element, event, fn) {
    if (element.removeEventListener) {
      element.removeEventListener(event, fn);
    } else if (element.detachEvent) {
      element.detachEvent('on' + event, fn);
    } else {
      element.
      'on' + event = null;
    }
  }
};

var salesOffices = {};
// 数组下标可以是字符串，活久见。
// 因为继承自object，所以只能用for(var x in object)这种方式访问
// 活久见*2
salesOffices.clientList = [];

salesOffices.listen = function(key, fn) {
  if (!this.clientList[key]) {
    this.clientList[key] = [];
  }
  this.clientList[key].push(fn);
};

salesOffices.listen('squ88', function() {
  console.log(Hello)
})

console.log(salesOffices.clientList)

var subscribeRelease = {
  subscribeList: [],
  listen: function(key, fn) {
    if (!this.subscribeList[key]) {
      this.subscribeList[key] = [];
    }
    this.subscribeList[key].push(fn);
  },
  trigger: function(key,data) {
    if (!this.subscribeList[key]) {
      return false;
    }
    for (var i = 0; i < this.subscribeList[key].length; i++) {
      this.subscribeList[key][i](data);
    }
  },
  remove: function(key, fn) {
    var list = this.subscribeList[key];
    if (!list) {
      return false;
    }
    if (!fn) {
      list.length = 0;
    }
    for (var x in list) {
      if (list[x] === fn) {
        console.log('same')
        list.splice(x, 1)
      }
    }
  }
};

// 因为每个匿名函数都是唯一的，所以传的时候要给参数命名。
subscribeRelease.listen('sayHello', fn3 = function(data) {
  console.log('Hello World0');
  console.log(data)
});
subscribeRelease.listen('sayHello', fn4 = function(data) {
  console.log('Hello World1');
});

subscribeRelease.trigger('sayHello',[1])

subscribeRelease.remove('sayHello', fn2);
subscribeRelease.trigger('sayHello')

var installSubscribe = function(obj) {
  for (var x in subscribeRelease) {
    obj[x] = subscribeRelease[x];
  }
};

var h = {};
installSubscribe(h)
console.log(h)

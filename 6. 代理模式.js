/**
 * 代理模式
 *
 * 关键在于当客户不方便直接访问一个对象或者不满足需要时。提供一个替身对象来控制访问。
 */

var Flower = function() {};

var xiaoming = {
  sendFlower: function(target) {
    var flower = new Flower();
    target.receiveFlower(flower);
  }
};

var A = {
  receiveFlower: function(flower) {
    console.log('Get Flower' + flower);
  }
};

xiaoming.sendFlower(A); // Get Flower[object Object]

var Flower = function() {};

var xiaoming = {
  sendFlower: function(target) {
    var flower = new Flower();
    target.receiveFlower(flower);
  }
};

var B = {
  receiveFlower: function(flower) {
    A.receiveFlower(flower);
  }
}

var A = {
  receiveFlower: function(flower) {
    console.log('Get Flower' + flower);
  }
};

xiaoming.sendFlower(B); // Get Flower[object Object]

// 虚拟代理
// 虚拟代理会把一些开销很大的对象，延迟到真正需要它时再去创建
// JavaScript中一般都是虚拟代理

// 在js中html元素都有一个对应的对象，这个对象的属性对应那个html元素的性质
// 所以可以用js代码添加事件监听函数
var myImage = (function() {
  var imgNode = document.createElement('img');
  document.body.appendChild(imgNode);

  return {
    setSrc: function(src) {
      imgNode.src = src;
    }
  };
})();

var proxyImage = (function() {
  var img = new Image;
  img.onload = function() {
    myImage.setSrc(this.src);
  }

  return {
    setSrc:function(src) {
      myImage.setSrc('./loading.gif');
      img.src = src;
    }
  }
})();

proxyImage.setSrc()
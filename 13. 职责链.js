var order500 = function(orderType, pay, stock) {
  if (orderType === 1 && pay === true) {
    console.log('500')
  } else {
    return 'nextSuccessor';
  }
};

var order200 = function(orderType, pay, stock) {
  if (orderType === 2 && pay === true) {
    console.log('200')
  } else {
    return 'nextSuccessor';
  }
};

var orderNormal = function(orderType, pay, stock) {
  if (stock > 0) {
    console.log('Normal')
  } else {
    console.log('No stock')
  }
};

var Chain = function(fn) {
  this.fn = fn;
  this.successor = null;
};

Chain.prototype.setNextSuccessor = function(successor) {
  return this.successor = successor;
};

Chain.prototype.passRequest = function() {
  // ret是子程序的返回指令
  // successor是接替者的意思
  // fn则是传入的函数
  var ret = this.fn.apply(this, arguments);

  if (ret === 'nextSuccessor') {
    return this.successor && this.successor.passRequest.apply(this.successor, arguments);
  }

  return ret;
};


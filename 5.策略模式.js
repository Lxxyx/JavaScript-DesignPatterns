/**
 * 5. 策略模式
 *
 * 定义：定义一系列算法，并把它们封装起来，并且它们可以相互替换。
 *
 * 组成：1.策略类，负责封装具体的算法。
 *       2.环境类Context，负责接受用户请求，并将请求委托给某一个策略类。
 */

// 传统的策略类方式，把算法隐藏在策略类内部。
// 然后context会根据设定的规则，去寻找其对应的算法。
// 感觉像是多态
var performanceS = function() {};

performanceS.prototype.caculate = function(salary) {
  return salary * 4;
};

var performanceA = function() {};

performanceA.prototype.caculate = function(salary) {
  return salary * 3;
};

var performanceB = function() {};

performanceB.prototype.caculate = function(salary) {
  return salary * 2;
};

var Bonus = function() {
  this.salary = null;
  this.strategy = null;
};

Bonus.prototype.setSalary = function(salary) {
  this.salary = salary;
};

Bonus.prototype.setStrategy = function(strategy) {
  this.strategy = strategy;
};

Bonus.prototype.getBonus = function() {
  return this.strategy.caculate(this.salary);
};

var bonus = new Bonus();
bonus.setSalary(10000);
bonus.setStrategy(new performanceS());
console.log(bonus.getBonus())

// JavaScript的策略类

var strategies = {
  'S': function(salary) {
    return salary * 4;
  },
  'A': function(salary) {
    return salary * 3;
  },
  'B': function(salary) {
    return salary * 2;
  }
};

var caculateBonus = function(level, salary) {
  return strategies[level](salary);
};

console.log(caculateBonus('S', 40000))

// 用策略模式实现缓动动画
// 
// Too difficult

// 用策略模式实现表单效验

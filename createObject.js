//工厂模式
function createPerson(name, age, job) {
    let o =new Object();
    o.name = name;
    o.age = age;
    o.job = job;
    o.sayName = function() {
        console.log(this.name)
    }
    return o;
}
// let person1 = createPerson('Nicholas', 29, 'SoftWare Engineer');
// let person2 = createPerson('Greg', 30, 'SoftWare Engineer');

//构造函数模式
function Person(name, age, job) {
    this.name = name;
    this.age = 12;
    this.job = job;
    this.sayName = function() {
        console.log(this.name)
    }
}
// let person1 = new Person('Nicholas', 29, 'SoftWare Engineer');
// let person2 = new Person('Greg', 30, 'SoftWare Engineer');

//原型模式
let PersonPro = function() {}
PersonPro.prototype.name = 'Jhon'
PersonPro.prototype.age = 26
PersonPro.prototype.sayName = function() {
    console.log(this.name)
}

//对象字面量式写法
let PersonEe = function() {}
PersonEe.prototype = {
    name: 'Matt',
    age: 81,
    sayName() {
        console.log(this.name)
    }
}

var each = function(ary, callback) {
    for(var i=0, l=ary.length; i<l ;i++) {
        callback.call(ary[i], i ,ary[i]);
    }
}
each([1,2,3,4,5], function(i, n) {
    console.log(i ,n);
})

//外部迭代器
var Iterator = function(obj) {
    var current = 0
    var next = function() {
        current += 1
    }
    var isDone = function() {
        return current >=obj.length
    }
    var getCurrentItem = function() {
        return obj[current]
    }
    return {
        next: next,
        isDone: isDone,
        getCurrentItem: getCurrentItem
    }
}
//比较两个数组元素是否完全相等的例子
var compare = function(iterator1, iterator2) {
    while(!iterator1.isDone() && !iterator2.isDone()) {
        if(iterator1.getCurrentItem() !== iterator2.getCurrentItem()) {
            throw new Error('不相等')
        }
        iterator1.next()
        iterator2.next()
    }
    console.log(iterator1 +'和'+iterator2+'相等')
}
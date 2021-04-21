function SuperType() {
    this.property = true
}

SuperType.prototype.getSuperValue = function() {
    return this.property
}

function SubType() {
    this.subproperty = false
}
SubType.prototype = new SuperType() //继承SuperType

SubType.prototype.getSubValue = function() {
    return this.subproperty
}

let instance = new SubType()
console.log(instance.getSuperValue(), instance.getSubValue())
console.log(instance.__proto__, instance.__proto__.prototype)

function A() {
    this.A  = 'A'
}
A.prototype.getStr = function() {
    return this.A
}
function B() {
    this.B = 'B'
}
B.prototype = A

function C() {
    this.C = 'C'
}
C.prototype = new A()

C.prototype.getC = function() {
    return this.C
}
let b =new B()
let c = new C()


//类中定义的constructor方法不会被当成构造函数，在对它使用instanceof操作符会返回false.但如果在创建实例时直接将类构造函数当成普通构造函数来使用，那么instanceof操作值会反转
class Person {}

let p1 = new Person()
console.log('p1',p1.constructor === Person) //true
console.log(p1 instanceof Person)   //true
console.log(p1 instanceof Person.constructor)  //false

let p2 = new Person.constructor()
console.log('p2',p2.constructor === Person)  // false
console.log(p2 instanceof Person)   //false
console.log(p2 instanceof Person.constructor) //true


class Person2 {
    constructor(name) {
        this.locale  = () => console.log('instance', name);
    }
    locale() {
        console.log('prototype')
    }
}

let p3 = new Person2('person1')
let p4 = new Person('person2')

class PersonIter {
    constructor() {
        this.nicknames = ['Jack', 'Mary', 'Jhon', 'Jake']
    }
    *[Symbol.iterator]() {
        yield *this.nicknames.entries()
    }
}
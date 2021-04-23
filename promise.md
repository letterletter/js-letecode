### 手写promise
*参考：https://zhuanlan.zhihu.com/p/144058361*
#### 手写promise构造函数
```js
const PENDING = 1;
const FULFILLED = 2;
const REJECTED = 3;

// Promise构造函数把一个叫做"处理器函数"的函数作为它的参数
function MyPromise(executor) {
    let self = this;             // 保存this执行上下文
    this.state = PENDING;        // 初始化promise的状态
    this.val = undefined;// 用于保存resolve传入的data或者reject传入的error
    this.resolveQueue = [];      // 用于保存resolve的回调函数
    this.rejectQueue = [];       // 用于保存reject的回调函数
    
    // 状态转变为 fulfilled 的方法
    function resolve(val) {
        // 判断传入val是否为 Promise 值，如果是，则状态改变必须等待前一个状态改变后再进行改变
        if (val instanceof MyPromise) {
          return val.then(resolve, reject);
        }
        // 只有状态为 pending 时才能转变
        if (self.state === PENDING) {
            // 保证代码的执行顺序为本轮事件循环的末尾
            setTimeout(() => {
                // 修改状态
                self.state = FULFILLED;
                // 设置传入的值
                self.val = val;
                // 执行回调函数
                self.resolveQueue.forEach(cb => cb(val));
            });
        }
    }
    
    // 状态转变为 rejected 的方法
    function reject(err) {
        if (self.state === PENDING) {
            setTimeout(() => {
                self.state = REJECTED;
                self.val = err;
                self.rejectQueue.forEach(cb => cb(err));
            });
        }
    }
    try {
        // 将两个方法传入函数执行
        executor(resolve, reject);
    } catch(err) {
        // 遇到错误时，捕获错误，执行 reject 函数
        reject(err);
    }
}
```
####手写Promise.prototype.then()
```
// then方法定义在prototype上，作用是为promise实例添加状态改变时的回调函数，then方法返回新promise实例(以此支持链式调用)
MyPromise.prototype.then = function(onResolve, onReject) {
    let self = this;
    // 首先判断两个参数是否为函数类型，因为这两个参数是可选参数
    // 不传值的话默认是一个返回原值的函数
    // onResolve，onReject是状态改变时的回调函数
    onResolve = typeof onResolve === 'function' ? onResolve : (v => v);
    onReject = typeof onReject === 'function' ? onReject : (e => { throw e });
    // 如果状态已经凝固，则直接执行对应状态的函数
    if (self.state === FULFILLED) {
        return new MyPromise(function(resolve, reject) {
            setTimeout(() => {
                try {
                    let x = onResolve(self.val);   // 执行回调函数
                    if (x instanceof MyPromise) {
                        x.then(resolve);
                    } else {
                        resolve(x);
                    }
                } catch(e) {
                    reject(e);
                }
            });
        });
    }


    if (self.state === REJECTED) {
        return new MyPromise(function(resolve, reject) {
            setTimeout(() => {
                try {
                    let x = onReject(self.val);
                    if (x instanceof MyPromise) {
                        x.then(resolve);
                    } else {
                        resolve(x);
                    }
                } catch(e) {
                    reject(e);
                }
            });
        });
    }

    // 如果是等待状态，则将函数加入对应列表中
    if (self.state === PENDING) {
        return new MyPromise(function(resolve, reject) {
            self.resolveQueue.push((val) => {
                try {
                    let x = onResolve(val);
                    // 如果x是promise实例，必须等x状态凝固后再改变状态
                    if (x instanceof MyPromise) {
                        x.then(resolve);
                    } else {
                        resolve(x);
                    }
                } catch(e) {
                    reject(e);
                }
            });
            self.rejectQueue.push((val) => {
                try {
                    let x = onReject(val);
                    if (x instanceof MyPromise) {
                        x.then(resolve);
                    } else {
                        resolve(x);
                    }
                } catch(e) {
                    reject(e);
                }
            });
        });
    }
}

```
#### 手写Promise.prototype.catch
```
// catch方法是then(null，onReject)的别名，用于指定发生错误时的回调函数
MyPromise.prototype.catch = function(onReject) {
    return this.then(null, onReject);
}
```
#### 手写Promise.all()
Promise.all方法用于将多个Promise实例包装成一个新的Promise实例。所有promise都变为fulfilled之后，才算成功，返回一个数。只要有一次错误，就reject，返回的错误是第一个失败promise的错误
```js
MyPromise.all = function(promises) {
    return new MyPromise(function(resolve, reject) {
        let cnt = 0;
        let result = [];
        for (let i = 0; i < promises.length; i++) {
            promises[i].then(res => {
                result[i] = res;
                if (++cnt === promises.length) resolve(result);
            }, err => {
                reject(err);
            })
        }
    });
}
```
#### 手写Promise.race()
Promise.race方法，多个promise实例，哪个时候实例先改变状态，Promise.race的状态就随着改变。
```js
MyPromise.race = function (promises) {
      return new Promise((resolve, reject) => {
        if (promises.length === 0) {
          resolve();
        } else {
          let index = 0;
          for (let i = 0; i < promises.length; i++) {
            promises[i].then(data => {
              resolve(data);
            }, err => {
              reject(err);
              return;
            });
          }
        }
    
```
#### 手写Promise.resolve()
```js
// Promise.resolve 将现有对象转为Promise对象
MyPromise.resolve = function(val) {
    return new MyPromise(function(resolve, reject) {
        resolve(val);
    });
}
```
#### 手写Promise.reject()
```js
// Promise.reject 返回一个带有指定错误的Promise对象
MyPromise.reject = function(err) {
    return new MyPromise(function(resolve, reject) {
        reject(err);
    })
}
```
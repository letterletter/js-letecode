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
// 防抖
// 在第一次触发事件时，不立即执行函数，而是给出一个期限值比如200ms，然后：
// 效果：如果短时间内大量触发同一事件，只会执行一次函数。

// 实现：既然前面都提到了计时，那实现的关键就在于setTimeout这个函数，由于还需要一个变量来保存计时，
//考虑维护全局纯净，可以借助闭包来实现
/*
* fn [function] 需要防抖的函数
* delay [number] 毫秒，防抖期限值
*/
function debounce(fn,delay){
  let timer = null //借助闭包
  return function() {
      if(timer){
          clearTimeout(timer) //进入该分支语句，说明当前正在一个计时过程中，并且又触发了相同事件。所以要取消当前的计时，重新开始计时
          timer = setTimeout(fn,delay) 
      }else{
          timer = setTimeout(fn,delay) // 进入该分支说明当前并没有在计时，那么就开始一个计时
      }
  }
}
/**
 * 节流
 * 类似控制阀门一样定期开放的函数，也就是让函数执行一次后，在某个时间段内暂时失效，过了这段时间后再重新激活（类似于技能冷却时间）。
 */
//  效果：如果短时间内大量触发同一事件，那么在函数执行一次之后，该函数在指定的时间期限内不再工作，直至过了这段时间才重新生效。

//  实现 这里借助setTimeout来做一个简单的实现，加上一个状态位valid来表示当前函数是否处于工作状态
function throttle(fn,delay){
  let valid = true
  return function() {
     if(!valid){
         //休息时间 暂不接客
         return false 
     }
     // 工作时间，执行函数并且在间隔期内把状态位设为无效
      valid = false
      setTimeout(() => {
          fn()
          valid = true;
      }, delay)
  }
}
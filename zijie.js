//二叉树层序遍历
function levelOrder( root ) {
  // write code here
  if(!root) return []
  let stack = [root]
  let res = []
  while(stack.length>0) {
      let arr = []
      let size = stack.length
      while(size>0) {
          let node = stack.shift()
          node.left && stack.push(node.left)
          node.right && stack.push(node.right)
          arr.push(node.val)
          size--
      }
     res.push(arr)
  }
  return res
}

//输入n个整数，找出其中最小的K个数。
function GetLeastNumbers_Solution(input, k)
{
  // write code here
}

var getLeastNumbers3 = function(arr, k) {
  let res = []
  if(!arr || !k) return []
  let len = arr.length
  for(let i = Math.floor(len/2-1); i>=0; i--) {
      Heapify(arr, len, i)
  }
  console.log(arr)
  for(let j=k; j>0; j--) {
      res.push(arr[0])
      len--
      swap(arr, 0, len)
//         arr.length = len--
      Heapify(arr, len, 0)
  }
  return res
};

function Heapify(A, size,  i) {
let l = 2*i+1, r = 2*i+2,smallest = i
if(l<size) {
  smallest = A[l] <A[i] ? l:smallest
}
if(r < size&& A[r] <A[smallest]) {
  smallest = r
}
console.log(i, smallest)
if(smallest!== i) {
  swap(A, i, smallest)
  Heapify(A, size, smallest)
}
}

function swap(arr, i, j) {
let tem = arr[i]
arr[i] = arr[j]
arr[j] = tem
}

function buildMaxHeap(A) {
let len = A.length
for(let i = Math.floor(len/2-1); i>=0; i--) {
  maxHeapify(A, len, i)
}
return A
}

//

//最小的k个数方式2 快排
var getLeastNumbers2 = function(arr, k) { //直接sort
  if(!arr || !k) return []
  let start = 0, end = arr.length-1
  let index = partition(arr, start, end)
  while(index !== k-1) { //若标杆元素位置不等于k
      if(index >k-1) {
          end = index-1
          index = partition(arr,start, end)
      }else {
          start = index+1
          index = partition(arr,start, end)
      }
  }
  return arr.slice(0,index+1)
};
function partition(arr, left, right)  {
  let pivot = arr[left]
  while(left<right) {
      while(left<right && arr[right] >=pivot) right--
      arr[left] = arr[right] ;//到达了比pivot小的，换位置
      while(left< right && arr[left] < pivot) left++
      arr[right] = arr[left]
  }
  arr[left] = pivot
  return left
}


//跳楼梯 一只青蛙一次可以跳上1级台阶，也可以跳上2级。求该青蛙跳上一个n级的台阶总共有多少种跳法（先后次序不同算不同的结果）
function jumpFloor(number)
{
  // write code here
  let a=1, b=1,cur;
  if(number<= 1) return 1;
  for(let i=2; i<=number;i++) {
      cur=a%1000000007+b%1000000007
      a=b
      b=cur

  }
  return cur
}

function twoSum( numbers ,  target ) {
  // write code here
  let map = new Map()
  for(let [k, v] of numbers.entries()) {
      map.set(v,k+1)
  }
  console.log(map)
  for(let i=0;i <numbers.length; i++) {
      let gindex = map.get(target-numbers[i])
      console.log('gindex',gindex)
      if(gindex&& gindex!==i+1) {
          return [i+1, gindex]
      }
  }
}

function maxsumofSubarray( arr ) {
  // write code here
  let len = arr.length
  let dp = new Array(len)
  dp[0] = arr[0]
  for(let i=1; i<len; i++) {
      if(dp[i-1]<0) {
          dp[i] = arr[i]
      }else {
          dp[i] = arr[i]+dp[i-1]
      }
  }
  console.log(dp);
}
//给定一个数组arr，返回arr的最长无的重复子串的长度(无重复指的是所有数字都不相同)。
function maxLength( arr ) {
  // write code here
  let curarr = [arr[0]]
  let res = 1
  for(let i=1; i<arr.length; i++) {
      if(!curarr.includes(arr[i])) {
          curarr.push(arr[i])
      }else {
          res = curarr.length > res?curarr.length:res
          let idx = curarr.indexOf(arr[i])
          curarr.push(arr[i])
          curarr = curarr.slice(idx+1)
      }
  }
  return res>curarr.length?res:curarr.length
}


//
function merge( A, m, B, n ) {
  // write code here
  let lastIdx = m+n-1;
  let curIdxA = m-1, curIdxB = n-1;
  while(curIdxA>-1&&curIdxB>-1) {
      if(A[curIdxA]<B[curIdxB] ) {
          A[lastIdx--] = B[curIdxB--]
      }else {
          A[lastIdx--] = A[curIdxA--]
      }
  }
  if(curIdxA<0) {
    A.splice(0, lastIdx+1, ...B.slice(0, curIdxB+1))
  }

  return A
}

function LCS( str1 ,  str2 ) {
  // write code here
  let m = str1.length, n = str2.length
  let max = -1
  let result = ''
  let dp = Array.from(new Array(m), () => new Array(n).fill(0))
  //dp[i][j]表示以str1[0...i]和str2[0...j]
  for(let i=0; i<m; i++) {
      if(str1[i] === str2[0]) {
          dp[i][0] = 1
          max = 1
          result=str2[0]
      }
  }
  for(let j=0; j<n; j++) {
      if(str1[0] === str2[j])
          dp[0][j] =1
          max = 1
          result=str1[0]
  }
  for(let i=1; i<m ;i++) {
      for(let j=1; j<n; j++) {
          if(str1[i] === str2[j]) {
              dp[i][j] = dp[i-1][j-1]+1
              if(dp[i][j]>max) {
                  max = dp[i][j]
                  result= getSubstr(str1,i, max)
              }
              
          }
      }
  }
  return result
}
  
function getSubstr(str, end, len) {
  let res = ''
  for(let i=len-1;i>=0 ;i--) { 
      res+=str[end-i]
  }
  return res
}

function LCS2( str1 ,  str2 ) { //滑动窗口
  // write code here
  let n=str1.length, m=str2.length
  let ret = {len: 0, str: ''};// 
  let result = ''
  for(let i=0;i<n ;i++) {//A滑动，和B首位对齐
      let len = Math.max(m,n-i )
      let maxLenObj = maxLength(str1,str2, i, 0, len)
      console.log(maxLenObj, 'startA'+i, 'end  '+0, len,)
      ret =  ret.len > maxLenObj.len?ret: maxLenObj;;
  }
  for(let i=0; i<m;i++) {
      let len = Math.min(n, m-i) //A数组和B滑动的这部分数组的最小值
      let maxLenObj = maxLength(str1, str2, 0, i, len)
      console.log(maxLenObj, 'startA  0', 'end'+i, len,)
      ret = ret.len > maxLenObj.len?ret: maxLenObj;
  }
  return ret.str
  
}

var maxLength = function(A, B, addA, addB, len) { //addA, addB为滑动的A,B数组的起始位置
  let ret = 0,k =0
  let rstr = ''
  let str = ''
  for(let i=0;i<len; i++) {
      if(A[addA+i] === B[addB+i]) {
          k++
          str+=A[addA+i]
      }else {
          k=0
          str=''
      }
      if(k>ret) {
        ret = k
        rstr = str
      }
  }
  return {len: ret, str: rstr};
}
//以字符串的形式读入两个数字，编写一个函数计算它们的和，以字符串形式返回
function solve( s ,  t ) {
  // write code here
  let resarr = []
  let s1 = [...s]
  let s2 = [...t]
  let carry = 0
  while(s1.length||s2.length ||carry>0) {
      let sum = parseInt(s1.pop()||0)+parseInt(s2.pop()||0)+carry
      carry = Math.floor(sum/10)
      sum = sum%10
      resarr.unshift(sum)
  }
  return resarr.join('')
}
//x的平方根
function sqrt( x ) {
  // write code here
  if(x === 0) return 0
  let ans = Math.floor(Math.exp(0.5*Math.log(x)))
  return (ans+1)*(ans+1) <=x ? ans+1: ans
}

function sqrt2(x) { //二分法
if(x === 0) {
      return 0
  }
  let l=0; r=x, ans=-1;
  while(l<=r) {
      let mid = parseInt(l+(r-l)/2)
      console.log('left right mid', l, r, mid)
      if(mid*mid <=x) {
          if(mid<ans) {
              break;
          }
          ans=mid;
          l=mid+1
      }else {
          r=mid-1;
      }
  }
  return ans;
}

//字符串的排列
function Permutation(str)
{
    // write code here
    let res = []
    let strarr = [...str].sort()
    let len = str.length
    const vis = new Array(str.length).fill(false)
    const backtrace = (idx, perm) => {//idx表示下一个代填入的位置是第index个位置，pern表示当前排列
        if(idx === len) {
            res.push(perm.join(''))
        }
        for(let i=0; i<len; i++) {
            if(vis[i] ||(i>0 && strarr[i]=== strarr[i-1] && !vis[i-1])) {
                continue;
            }
            perm.push(strarr[i])
        //       console.log('idx nums[i]', idx, strarr[i])
              vis[i] = true //将第i项使用过设为true
        //       console.log('vis', vis)
              backtrace(idx+1, perm)
              vis[i] = false
        //       console.log('vis 置为未访问过',vis)
        //       console.log('pop', perm.pop(), perm)
              perm.pop()
        }
    }
    backtrace(0, [])
    return res
}
module.exports = {
    Permutation : Permutation
};
// 给定一个整型数组arr和一个大于1的整数k。已知arr中只有1个数出现了一次，其他的数出现k次，请返回出现了1次的数。
function foundOnceNumber( arr ,  k ) {
  // write code here
  arr.sort((a,b) => a-b)
  let  len=arr.length
  let t = Math.floor(arr.length/k)
  for(let i=0; i<len; i=i+k) {
      if(arr[i] !== arr[i+k-1]) {
          return arr[i]
      }
  }
  return arr[len-1]
  
}

//单调栈
// 给定一个可能含有重复值的数组 arr，找到每一个 i 位置左边和右边离 i 位置最近且值比 arr[i] 小的位置。
//返回所有位置相应的信息。位置信息包括：两个数字 L 和 R，如果不存在，则值为 -1，下标从 0 开始。
function foundMonotoneStack( nums ) {
  // write code here
  let len = nums.length
  let left = new Array(len).fill(-1)
  let right = new Array(len).fill(-1)
  let stack = [],stack2 = []
  for(let i=0; i<len; i++) {
      let cur = nums[i];
      while(stack.length>0 && cur<nums[stack[stack.length-1]]) {
          let pos = stack.pop()
          left[pos] = i
      }
      stack.push(i) //stack存放下标
  }
  for(let j=len-1; j>=0; j--) {
      let cur = nums[j]
      while(stack2.length>0 && cur< nums[stack2[stack2.length-1]]) {
          let pos = stack2.pop()
          right[pos] = j
      }
      stack2.push(j)
  }
  return [left, right]
}
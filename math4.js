// 153. 寻找旋转排序数组中的最小值
// 给你一个元素值 互不相同 的数组 nums ，它原来是一个升序排列的数组，并按上述情形进行了多次旋转。请你找出并返回数组中的 最小元素 。

// 注意，数组 [a[0], a[1], a[2], ..., a[n-1]] 旋转一次 的结果为数组 
//[a[n-1], a[0], a[1], a[2], ..., a[n-2]] 。
var findMin = function(nums) {
  let len = nums.length
  if(len === 1) return nums[0]
  if(nums[0] < nums[len-1]) return nums[0]  //还是原来的数组
  let left =0, right = len-1
  while(left < right) {
    let mid = (left+right) >>1
    if(nums[mid] > nums[mid+1]) {
      return nums[mid+1]
    }
    if(nums[mid-1] > nums[mid]) {  //在mid位置下降
      return nums[mid]
    }
    if(nums[mid] > nums[0]) { //mid左侧升序，右侧产生旋转点
      left = mid+1
    }else {
      right=mid-1
    }
  }
  return -1
}

//154寻找旋转排序数组最小值，可能含有重复元素
var findMin = function(nums) {
  let low = 0
  let high = nums.length -1
  while(low < high) {
    const pivot = (low+high) >>1
    if(nums[pivot] <nums[high]) { 
      //中轴元素小于最有边界元素，忽略右半部分
      high = pivot
    }else if(nums[pivot] > nums[high]) {
      //这说明nums[pivot] 是最小值左侧的元素，因此我们可以忽略二分查找区间的左半部分。
      low = pivot+1
    }else {
      high = high-1
    }
  }
  return nums[low]
}

// Offer 15. 二进制中1的个数
var hammingWeight = function(n) {
    let str = n.toString(2)
    let regExp = /1/g
    let res = regExp.exec(str)
    console.log(res)
};

function judge(arr, zerocount) {

}
function hasRepeat(sortedArr) {
  let set = new Set(sortedArr)
  return set.size !== sortedArr.length
}
//扑克牌中的顺子
var isStraight = function(nums) {
  nums.sort((a,b) => a-b)  //从小到大排序
  let zerocount = 0; //0的个数
  for(let i=0,len=nums.length; i<len; i++) {
    if(nums[i] === 0) zerocount++;
    else break;
  }
  nums = nums.slice(zerocount)  //去掉0剩下部分
  if(hasRepeat(nums)) { //有重复元素
    return false
  }else {
    return Math.max(...nums) - Math.min(...nums) <=4; 
    //如果最大-最小>4,比如6-1，无论填什么就不行,小于等于4时，可以=4时，往里面填，小于4，往外面填
  }
};

//剑指 Offer 44. 数字序列中某一位的数字
// 数字以0123456789101112131415…的格式序列化到一个字符序列中。在这个序列中，第5位（从下标0开始计数）是5，
// 第13位是1，第19位是4，等等。

var findNthDigit = function(n) {
  if(n <=9) {
    return n;
  }
  let digit=1, start = 1, count=9;  //digit为n的位数，start为位数从start开始,count为数位数量
  while(n > count) {
    n = n-count
    digit++;
    start = start*10;
    count= start*9*digit
  }
  console.log(digit, count)
  let num = start + parseInt((n-1)/digit);
  let index = (n-1)%digit
  console.log(num, index)
  return num.toString()[index] - '0'
};


// 剑指 Offer 45. 把数组排成最小的数
// 输入一个非负整数数组，把数组里所有数字拼接起来排成一个数，打印能拼接出的所有数字中最小的一个。
/**
 * @param {number[]} nums
 * @return {string}
 */
 var minNumber = function(nums) {
  nums.sort((a,b) => parseInt(a+''+b) > parseInt(b+''+a))
  console.log(nums)
  console.log(nums.join(''))
};

//剑指offer64
// 求 1+2+...+n ，要求不能使用乘除法、for、while、if、else、switch、case等关键字及条件判断语句（A?B:C）。
var sumNums = function(n) {
  n && (n+=sumNums(n-1) )
  return n
};

// 剑指 Offer 20. 表示数值的字符串
//请实现一个函数用来判断字符串是否表示数值（包括整数和小数）。


var isNumber = function(s) {

};
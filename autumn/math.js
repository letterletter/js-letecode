// 560. 和为K的子数组
// 给定一个整数数组和一个整数 k，你需要找到该数组中和为 k 的连续的子数组的个数。

/**
 * @param {number[]} nums
 * @param {number} k
 * @return {number}
 */
 var subarraySum = function(nums, k) {
   // 定义prev[i] 为[0..i]里所有数的和，则pre[i] = pre[i-1]+nums[i], pre[j-1] = pre[i] - k;
   // 哈希表，以和为键，出现次数为对应的值，记录pre[i]出现的次数，从左往右更新map边计算答案，
   // 那么以i结尾的答案map[pre[i]-k] 即可在O(1)时间内得到
  const map = new Map()
  map.set(0, 1);
  let count = 0, pre = 0;
  for(const x of nums) {
    pre +=x;
    if(map.has(pre - k)) {
      count += map.get(pre - k);
    }
    if(map.has(pre)) {
      map.set(pre, map.get(pre) + 1)
    }else {
      map.set(pre, 1)
    }
  }
  return count;
};

// 581. 最短无序连续子数组
// 给你一个整数数组 nums ，你需要找出一个 连续子数组 ，如果对这个子数组进行升序排序，那么整个数组都会变为升序排序。
// 请你找出符合题意的 最短 子数组，并输出它的长度。
/**
 * @param {number[]} nums
 * @return {number}
 */
var findUnsortedSubarray = function(nums) {
  if (isSorted(nums)) {
    return 0;
  }
  const numsSorted = [...nums].sort((a,b) => a-b);
  let left = 0;
  while(nums[left] === numsSorted[left]) {
    left++;
  }
  let right = nums.length - 1;
  while(nums[right] === numsSorted[right]) {
    right--;
  }
  return right - left +1;
};
function isSorted (nums) {
  for (let i = 1, size = nums.length; i < size; i++) {
    if (nums[i] < nums[i-1]) {
      return false;
    }
  }
  return true;
}
// let b = new Array(6).fill(0).map(() => new Array(3).fill(0))
// let a = Array.from(new Array(6), () => new Array(3))

//不同路径  一个机器人位于一个 m x n 网格的左上角 （起始点在下图中标记为 “Start” ）。
// 机器人每次只能向下或者向右移动一步。机器人试图达到网格的右下角（在下图中标记为 “Finish” ）。
// 问总共有多少条不同的路径？
//f(i,j) 表示从左上角走到 (i, j)(i,j) 的路径数量，其中 i和 j的范围分别是[0,m) 和[0,n)。f(i,j)=f(i−1,j)+f(i,j−1)
var uniquePaths = function(m, n) {
  let f = new Array(m).fill(0).map(() => new Array(n).fill(0))
  for(let i = 0; i<m; i++) {
      f[i][0] = 1
  }
  for(let j=0; j<n; j++) {
      f[0][j] = 1
  }
  for(let i=1; i<m ;i++) {
      for(let j=1; j<n; j++) {
          f[i][j] = f[i-1][j]+f[i][j-1]; //从左边移过来，从上边移下来
      }
  }
  return f[m-1][n-1]
};
//不同路径II,网格中有障碍物  滚动数组
var uniquePathsWithObstacles = function(obstacleGrid) {
  let row = obstacleGrid.length, col = obstacleGrid[0].length
  console.log(row,col)
  let f = new Array(col).fill(0)
  f[0] = obstacleGrid[0][0] === 0? 1:0
  for(let i=0; i< row; i++) {
      for(let j=0; j<col; j++) {
          if(obstacleGrid[i][j] === 1) { //i,j位置有障碍物
              f[j] = 0;
              continue
          }
          if(j-1 >=0 && obstacleGrid[i][j-1] === 0) { //左边存在，且不是障碍物
              f[j]+=f[j-1]
          }
      }
  }
  console.log(f)
  return f[col-1]
};

//322 零钱兑换
//给定不同面额的硬币 coins 和一个总金额 amount。编写一个函数来计算可以凑成总金额所需的最少的硬币个数。如果没有任何一种硬币组合能组成总金额，返回 -1
var coinChange = function(coins, amount) {
  let max = amount+1
  let dp = new Array(amount+1).fill(max)
  dp[0] = 0 //组成金额0所需的硬币数量为0
  for(let i=1; i<= amount; i++) {
      for(let j=0; j < coins.length; j++) {
          if(coins[j] <=i) { //当前硬币大小 < 组成金额金额i
              dp[i] = Math.min(dp[i], dp[i-coins[j]]+1)  //取最小
          }
      }
  }
  return dp[amount]> amount ? -1: dp[amount]
};

//最大连续1的个数 给定一个二进制数组， 计算其中最大连续1的个数。输入数组只包含0，1
var findMaxConsecutiveOnes = function(nums) {
  let arr = new Array(nums.length).fill(0)
  arr[0] = nums[0] === 1?1:0
  let max = arr[0]
  for(let i=1; i<nums.length; i++) {
      if(nums[i]===1) {
          arr[i] = nums[i]+arr[i-1]
          max = Math.max(arr[i],max)
      }
  }
  return max
};
//解码方法 一条包含字母 A-Z 的消息通过以下映射进行了 编码 ：A-1, Z-26
//给你一个只含数字的 非空 字符串 num ，请计算并返回 解码 方法的 总数 。
//dp[i]为str[0...i]的译码方法总数，s[i]=0时，若s[i-1] ='1'||'2',dp[i] = dp[i-2];否则return 0
//若s[i-1] = '1',sp[i] = dp[i-1]+dp[i-2];若s[i-1]='2',且'1'<=s[i]<='6',则dp[i] = dp[i-1]+dp[i-2]
var numDecodings = function(s) {
  if(s[0] === '0') return 0;
  let dp = new Array(s.length).fill(0)
  dp[0] = 1
  for(let i=1,len=s.length; i<len; i++) {
      if(s[i] === '0') {
          if(s[i-1] ==='1'||s[i-1] === '2') {
              dp[i] = (i-2)>=0 ? dp[i-2]:1
          }else return 0
      }else {
          if(('1'<=s[i]&& s[i]<='6'&& s[i-1] === '2')||s[i-1] === '1') {
              dp[i] = dp[i-1] +((i-2) >=0 ?dp[i-2]:1)
          }else {
              dp[i] = dp[i-1]
          }
      }
  }
  return dp[s.length-1]
};

//单词拆分
// 给定一个非空字符串 s 和一个包含非空单词的列表 wordDict，判定 s 是否可以被空格拆分为一个或多个在字典中出现的单词。
// 拆分时可以重复使用字典中的单词，可以假设字典中没有重复的单词
/**
 * @param {string} s
 * @param {string[]} wordDict
 * @return {boolean}
 */
var wordBreak = function(s, wordDict) {
  let len = s.length;

  // 初始化为''
  let dp = new Array(len + 1).fill('');
  for(let j = 1; j <= len; j++) {
      let str = s.slice(0, j);

      // 遍历wordDict
      for(let word of wordDict) {
          let wlen = word.length;
          if(wlen <=j && dp[j] + dp[j-wlen] + word === str) {
              dp[j] += dp[j-wlen] +word
          }
      }
  } 
  return dp[len] === str
};
//最长公共子序列
//给定两个字符串 text1 和 text2，返回这两个字符串的最长公共子序列的长度。
var longestCommonSubsequence = function(text1, text2) {
    let 
};

////全排列 给定一个 没有重复 数字的序列，返回其所有可能的全排列。
var permute = function(nums) {
  const result = []
  const DFS = function(arr) {
      if(arr.length === nums.length) {
          result.push(arr.slice())
          return
      }

      for(let i=0;i<nums.length; i++) {
          console.log(arr, i)
          if(!arr.includes(nums[i])) {
              arr.push(nums[i])
              DFS(arr)
              arr.pop()
          }
      }
  }
  DFS([])
  return result
};


//全排列2 给定一个可包含重复数字的序列 nums ，按任意顺序 返回所有不重复的全排列。
var permuteUnique = function(nums) {
nums.sort()
const ans = []
const vis = new Array(nums.length).fill(false)
const backtrack = (idx, perm) => { //index表示下一个代填入的位置是第index个位置，pern表示当前排列
  if(idx === nums.length) {
    ans.push(perm.slice());
    return 
  }
  for(let i=0;i<nums.length; i++) {
    if(vis[i] || (i>0 && nums[i] === nums[i-1] && !vis[i-1])) { //访问过或者未访问过但和前一个数回溯时置为未访问
      continue;
    }
    perm.push(nums[i])
    console.log('idx nums[i]', idx, nums[i])
    vis[i] = true //将第i项使用过设为true
    console.log('vis', vis)
    backtrack(idx+1, perm)
    vis[i] = false
    console.log('vis 置为未访问过',vis)
    console.log('pop', perm.pop(), perm)
//       perm.pop()
  }
}

backtrack(0, [])
return ans;
};
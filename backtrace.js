//组合总和
//给定一个无重复元素的数组 candidates 和一个目标数 target ，找出 candidates 中所有可以使数字和为 target 的组合。
//candidates 中的数字可以无限制重复被选取。
// 定义递归函数 dfs(target, combine, idx) 表示当前在 candidates 数组的第 idx 位，还剩 target 要组合，已经组合的列表为 combine。递归的终止条件为 target <= 0 或者 candidates 数组被全部用完。

var combinationSum = function(candidates, target) {
    let len = candidates.length
    candidates.sort() ;//从小到大排序
    const ans = []
    function dfs(target, combine, idx) { //combine为已组合的列表, target表示还剩target要组合,idx表示当前在数组的第idx位
    console.log(target, combine, idx)
      if(idx === candidates.length) {
          return
      }
      if(target === 0) {
          ans.push(combine);
          return
      }
      //直接跳过
      dfs(target, combine, idx+1)
      if(target - candidates[idx] >=0) {
          dfs(target-candidates[idx], [...combine, candidates[idx]], idx)
      }
    }
    dfs(target, [], 0)
    return ans
};

//全排列 给定一个 没有重复 数字的序列，返回其所有可能的全排列。
//回溯法
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


//组合
// 给定两个整数 n 和 k，返回 1 ... n 中所有可能的 k 个数的组合。
var combine = function(n, k) {
  const ans = []

  const DFS = function(arr, startIndex) {
    console.log('arr', startIndex)
    if(arr.length === k) {
      ans.push(arr.slice())
      return
    }
    for(let i=startIndex;i<=n ;i++) {
        arr.push(i)
        console.log('ddd', arr)
        DFS(arr, i+1) //下一位开始
        arr.pop()
    }
  }

  DFS([], 1)
  return ans
};

//子集
//给你一个整数数组 nums ，返回该数组所有可能的子集（幂集）。解集不能包含重复的子集。
//单看每个元素，都有两种选择：选入子集，或不选入子集。考察当前枚举的数，基于选它，继续选下去是一个递归分支；基于不选它，继续选下去是一个递归分支
var subsets = function(nums) {
  let n = nums.length
  const ans = []
  const dfs = (index, list) => {
    if(index === n) {
      ans.push(list.slice())
      return
    }
    list.push(nums[index]) //放入这个数
    dfs(index+1, list)
    list.pop() ;//上面的递归结束，撤销放入
    dfs(index+1, list)
  }
  dfs(0, [])
  return ans
};
//思路2 在递归之前就加入解集，即，在递归压栈前 “做事情”。
//每次递归枚举的选项变少，一直递归到没有可选的数字，进入不了 for 循环，就进入不了递归，整个DFS结束。我们没有显式地设置递归的出口，而是通过控制循环的起点，使得最后递归自然结束。
var subsets2 = function(nums) {
  let n = nums.length
  const ans = []
  const dfs = (index, list) => {
    ans.push(list.slice()) //调用递归前，加入解集
    for(let i = index; i<nums.length; i++) {//枚举出所有可选的数
        list.push(nums[i]) //选这个数
        dfs(i+1, list) //基于选这个数，继续递归，传入i+1
        list.pop()
    }
  }
  dfs(0, [])
  return ans
};





////括号生成
//数字 n 代表生成括号的对数，请你设计一个函数，用于能够生成所有可能的并且 有效的 括号组合。
var generateParenthesis = function(n) {
  const res = []
  function dfs(l, r, str) {
    if(l=== n && r === n) {
      return res.push(str)
    }
    if(l<r) { //不满足条件，剪枝
      return
    }
    // l小于n，可以插入左括号，最多可以插n个
    if(l<n) {
      dfs(l+1, r, str+'(')
    }

    if(r<l) { //r<l,可以插入右括号
      dfs(l, r + 1, str + ")");
    }
  }
  dfs(0,0,'')
  return res
};


//n皇后问题
// var solveNQueens = function(n) {
    
// };
var nqueues = function(n) {
  let x = new Array(n).fill(-1)
  let k=0
  let res = []
  while(k>=0) {
//         debugger;
      x[k] =x[k]+1
//         console.log('k', k, x[k])
      while(x[k] <n && !place(k, x)) {
          x[k] = x[k]+1
//              console.log('re place', k, x[k])
      }
      if(x[k] <=n-1) {
          if(k === n-1) {
              let format = formatData(x)
              res.push(format)
              console.log('end', x)
          }else {
              k=k+1;x[k] = -1
          }
      }else {
          k=k-1
      }
  }
  return res
}
var place = function(k,x) {
  let i=0;
  while(i<k) {
      if(x[i] === x[k] || Math.abs(x[i]-x[k])===Math.abs(i-k))
          return false
      i++
  }
  return true
}

var formatData = function(x) {
  let n = x.length
  let arr = Array.from(new Array(n), () => '.'.repeat(n) )
  x.forEach((item, index) => {
      arr[index] = (arr[index].substr(0,x[index])+'Q').padEnd(n, '.')
  })
  return arr
}

//n皇后II，给定一个整数 n，返回 n 皇后不同的解决方案的数量。
var totalNQueens = function(n) {
  let x = new Array(n).fill(-1)
  let k=0
  let count = 0
  while(k>=0) {
      x[k] =x[k]+1
      while(x[k] <n && !place(k, x)) {
          x[k] = x[k]+1
      }
      if(x[k] <=n-1) {
          if(k === n-1) {
              count++
              console.log('end', x)
          }else {
              k=k+1;x[k] = -1
          }
      }else {
          k=k-1
      }
  }
  return count
};
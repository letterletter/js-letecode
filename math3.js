//寻找峰值  峰值元素是指其值大于左右相邻值的元素。给定一个输入数组 nums，其中 nums[i] ≠ nums[i+1]，找到峰值元素并返回其索引。
//数组可能包含多个峰值，在这种情况下，返回任何一个峰值所在位置即可。可以假设nums[-1] = nums[n] = -∞。
//方法一，线性扫描
var findPeakElement = function(nums) {
    for(let i=0;i<nums.length-1;i++) { //若原数组降序，数组第一项就会符合numsp[0] >num[1],满足；若峰值出现在中间某处，循环到产生下降这点，返回
        if(nums[i] >nums[i+1]) {
            return  i;
        }
        //升序，继续循环
    }
    return nums.length-1; //遍历完数组，没有找到一处降序，及原数组升序
};
//方法二 ，二分查找若该元素恰好位于升序序列或者一个局部上升坡度中（通过将 nums[i]nums[i] 与右侧比较判断)，则说明峰值会在本元素的右边。于是，我们将搜索空间缩小为 midmid 的右边，并在右侧子数组上重复上述过程。
//就这样，我们不断地缩小搜索空间，直到搜索空间中只有一个元素，该元素即为峰值元素。

var findPeakElement2 = function(nums) {
    const search = (nums, l, r) => {
        if(l === r) {
            return l;
        }
        let mid = Math.floor((l+r)/2)
        if(nums[mid]>nums[mid+1]) {
            return search(nums, l, mid)
        }else {
            return search(nums, mid+1,r)
        }
    }
    return search(nums, 0, nums.length-1); 
};
//寻找重复数 
//给定一个包含 n + 1 个整数的数组 nums，其数字都在 1 到 n 之间（包括 1 和 n），可知至少存在一个重复的整数。假设只有一个重复的整数，找出这个重复的数。
var findDuplicate = function(nums) {
    let obj ={}
    for(let i=0;i<nums.length;i++) {
        if(!obj[nums[i]]) {
            obj[nums[i]] = 1
        }else {
            return nums[i]
        }
    }
    
};
var findDuplicate2 = function(nums) {
    let obj ={}
    for(let i=0,j=nums.length-1;i<=j;i++,j--) {
        if(!obj[nums[i]]) {
            obj[nums[i]] = 1
        }else {
            return nums[i]
        }
        if(i!==j) {
            if(!obj[nums[j]]) {
                obj[nums[j]] = 1
            }else {
                return nums[j]
            }
        }
    }
    
};
//最长递归子序列
//给你一个整数数组 nums ，找到其中最长严格递增子序列的长度。
//子序列是由数组派生而来的序列，删除（或不删除）数组中的元素而不改变其余元素的顺序。例如，[3,6,2,7] 是数组 [0,3,1,6,2,2,7] 的子序列。
//动态规划 定义 dp[i]dp[i] 为考虑前 ii 个元素，以第 ii 个数字结尾的最长上升子序列的长度，注意 \textit{nums}[i]nums[i] 必须被选取。
//我们从小到大计算 dp[]dp[] 数组的值，在计算 dp[i]dp[i] 之前，我们已经计算出 dp[0 \ldots i-1]dp[0…i−1] 的值，则状态转移方程为：
//dp[i]=max(dp[j])+1,其中0≤j<i且num[j]<num[i]
//即考虑往 dp[0 \ldots i-1]dp[0…i−1] 中最长的上升子序列后面再加一个 nums[i]。由于 dp[j]dp[j] 代表nums[0…j] 中以nums[j] 结尾的最长上升子序列，所以如果能从 dp[j]dp[j] 这个状态转移过来，那么nums[i] 必然要大于nums[j]，才能将nums[i] 放在nums[j] 后面以形成更长的上升子序列。

var lengthOfLIS = function(nums) {
    if(nums.length === 0) {
        return 0
    }
    let dp = []
    dp[0] = 1
    let maxans=1
    for(let i=1;i<nums.length;i++) {
        dp[i]=1
        for(let j=0;j<i;j++) {
            if(nums[i] >nums[j]) {
                dp[i] = Math.max(dp[i], dp[j]+1)
            }
        }
        maxans = Math.max(maxans, dp[i])
    }
    return maxans
};
//有序矩阵中第k小的元素 ,方法1，转为一维数组直接排序，取第k位
//方法2，归并排序
var kthSmallest = function(matrix, k) {
    if(matrix.length <1) return 0;
    let arr = matrix.reduce((a,b) => merge(a,b))
    return arr[k-1]
};
function merge(left, right) {
    let len1 = left.length,len2=right.length
    let i=0, j=0
    let res = []
    while(i <len1 && j <len2) {
        left[i] < right[j] ? res.push(left[i++]) : res.push(right[j++])
    }
    while(i<len1) { res.push(left[i++])}
    while(j<len2) { res.push(right[j++])}
    return res
}

//最大数
//给定一组非负整数 nums，重新排列它们每个数字的顺序（每个数字不可拆分）使之组成一个最大的整数。
//比较 ab 与 ba的大小，按降序排列；再将数组转化为字符串。
var largestNumber = function(nums) {
    nums.sort((a,b) => {
        let s1 = `${a}${b}`
        let s2 = `${b}${a}`
        return s2-s1; //降序
    })
    return nums[0] ? nums.join(''):'0'
};
//斐波那契
var fib = function(n) {
    let dp=[0,1], i=1
    while(i++ < n) {
        console.log(i)
       let tem = dp[1]
       dp[1] = dp[0]+dp[1]
       dp[0] = tem
    } 
    return n==0 ? 0:dp[1]
};
var fib2 = function(n) {
    if(n <2) {
        return n
    }else {
        return fib2(n-1)+fib2(n-2)
    }
}
//逆波兰表达式求值
var Cal = {
    '*': (a, b) => a*b,
    '/': (a,b) => Math.trunc(a/b),
    '+': (a,b) => a+b,
    '-': (a,b) => a-b
}
var evalRPN = function(tokens) {
    const stack = []
    tokens.forEach(item => {
        console.log(item)
        if(item in Cal) {
            let b = stack.pop()
            let a = stack.pop()
            const res = Cal[item](a,b)
            console.log(res)
            stack.push(res)
        }else {
            stack.push(Number(item))
        }
    })
    return stack.pop()
};

//多数元素 给定一个大小为 n 的数组，找到其中的多数元素。多数元素是指在数组中出现次数 大于 ⌊ n/2 ⌋ 的元素。
var majorityElement = function(nums) {
    //方法1，利用哈希表，每个元素以及出现的次数
};
//排序 如果将数组 nums 中的所有元素按照单调递增或单调递减的顺序排序，那么下标为 n/2向下取整的元素（下标从0开始），是众数
var majorityElement2 = function(nums) {
    nums.sort()
    return nums[Math.floor(nums.length/2)]
};



//739 每日温度
//请根据每日 气温 列表，重新生成一个列表。对应位置的输出为：要想观测到更高的气温，至少需要等待的天数。如果气温在这之后都不会升高，请在该位置用 0 来代替。
//temperatures = [73, 74, 75, 71, 69, 72, 76, 73]，你的输出应该是 [1, 1, 4, 2, 1, 1, 0, 0]
var dailyTemperatures = function(T) { //单调栈解法
    let len = T.length
    let ans = new Array(len).fill(0)
    let stack = [] //放下标
    for(let i=0 ;i< len; i++) {
        let temperature = T[i]
        while(stack.length >0 && temperature>T[stack[stack.length-1]]) { //第i天的温度大于栈顶，弹出栈顶索引，栈顶索引找到大于的,继续试探下层循环
            let preInd
            ex = stack.pop()
            ans[preIndex] = i - preIndex;
        }
        stack.push(i)
    }
    return ans
};

//n是不是3的次方
var isPowerOfThree = function(n) {
    if(n<1) {
        return false
    }
    let threeStr = n.toString(3)
    let regExp = new RegExp(/^10*$/)
    return regExp.test(threeStr)
//     return threeStr.indexOf('1')===threeStr.lastIndexOf('1')&& (threeStr.indexOf('2') === -1)
};
var isPowerOfThree2 = function(n) {
    if(n<1) {
        return false
    }
    while(n%3 === 0) {
        n/=3
    }
    return n===1
};
//整数替换,给定一个正整数 n ，你可以做如下操作：n是奇数，用n+1或n+2替换n,n是偶数，用n/2替换n
var integerReplacement = function(n) {
    let count = 0;
    while(n>1) {
        if(n === 3) {
            n--
        }else if(n%2 === 0) {
            n>>>=1
        }else {
            n = (n+1)%4 === 0 ? n+1:n-1
        }
        count++
    }
    return count
};

//平方数之和 给定一个非负整数 c ，你要判断是否存在两个整数 a 和 b，使得 a*a + b*b = c 
var judgeSquareSum = function(c) {
    let sqrtc = Math.floor(Math.sqrt(c))
    let left = 0, right =sqrtc
    let find = false
    while(left<=right) {
        let sum = left*left+right*right
        if(sum === c) {
            return true
        }
        else if(sum<c) {
            left++
        }else {
            right--
         }
    }
    return false
};

//完全平方数 给定正整数 n，找到若干个完全平方数（比如 1, 4, 9, 16, ...）使得它们的和等于 n。你需要让组成和的完全平方数的个数最少。
var numSquares = function(n) {

};

//回文素数 求出大于或等于 N 的最小回文素数。
//回顾一下，如果一个数大于 1，且其因数只有 1 和它自身，那么这个数是素数。回顾一下，如果一个数从左往右读与从右往左读是一样的，那么这个数是回文数。
var primePalindrome = function(N) {
    const isPrime = function(num) {
        if(num<2) return false
        let n = Math.floor(Math.sqrt(num))
        for(let i=2; i<=n; i++) {
            if(num%i === 0) return false
        }
        return true
    }

};


//加油站
var canCompleteCircuit = function(gas, cost) {

};
//
//最小的k个数
var getLeastNumbers = function(arr, k) { //直接sort
    arr.sort((a, b)=> a-b)
    return arr.slice(0, k)
};
//方式2 快排
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

//最小的k个数，堆
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

//计算器 给定一个包含正整数、加(+)、减(-)、乘(*)、除(/)的算数表达式(括号除外)，计算其结果。
// 表达式仅包含非负整数，+， - ，*，/ 四种运算符和空格  。
var calculate = function(s) {
  let strn = s.replaceAll(' ','')
  let stack = []
  let sum = 0
  let num = 0
  let sign = '' //存储上一次符号
  for(let i=0 ;i< strn.length; i++) {
    if(/\d/.test(strn[i])) {
      num = num*10+(strn[i]-'0')
      console.log('i', i, strn[i])
    }
    if('+-*/'.indexOf(strn[i])>-1 || i===strn.length-1) {
      if(!sign) sign = '+';
      console.log('sign',sign,i)
      switch(sign) {
        case '+':
        stack.push(num);
        break;
        case '-':
        stack.push(-num);
        break;
        case '*':
        stack.push(stack.pop()*num);
        break;
        case '/':
        stack.push(Math.floor(stack.pop()/num))
        break;
      }
      num = 0;
      sign = strn[i]
      console.log(stack)
    }
  }
  console.log(stack)
  while(stack.length) {
    sum+=stack.pop()
  }
  return sum
};
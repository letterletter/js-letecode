//阶乘后的0
//给定一个整数 n，返回 n! 结果尾数中零的数量。  计算因子法 
var trailingZeroes = function(n) {
    let zerocount = 0
    for(let i=5;i<=n; i++) {
        let currentFactor = i
        while(currentFactor%5 === 0) {  //每隔5个数，出现一个5，每隔25个数，出现两个5，每隔125个数，出现3个5
            zerocount++;
            currentFactor/=5
        }
    }
    return zerocount;
};
//数字1的个数
// 给定一个整数 n，计算所有小于等于 n 的非负整数中数字 1 出现的个数。
var countDigitOne = function(n) {
    let count = 0
    for(let i=1; i<=n ;i*=10) {
        let divider = i*10
    }
};



// 给定一个非负整数 num，反复将各个位上的数字相加，直到结果为一位数。
var addDigits = function(num) {
    while(num/10>=1) {
        let count = 0
        let tem = num
        while(tem>0) {
            count+=tem%10
            tem = parseInt(tem/10)
        }
        console.log('count', count)
        num=count
    }

    return num
};
//只出现一次的数字 III  给定一个整数数组 nums，其中恰好有两个元素只出现一次，其余所有元素均出现两次。 找出只出现一次的那两个元素。
var singleNumber = function(nums) {
    let map={}
    let arr = []
    nums.forEach(item => {
        if(!map[item]) {
            map[item] = 1
        }else {
            arr.push(item)
        }
    })
    return arr
};

//丢失的数字 给定一个包含 [0, n] 中 n 个数的数组 nums ，找出 [0, n] 这个范围内没有出现在数组中的那个数
//数学方法 高斯公式求出0-n的和，减去数组中所有数的和
var missingNumber = function(nums) {
    let n = nums.length
    let gsum = n*(n+1)/2
    let tsum = nums.reduce((pre, cur) => pre+cur, 0)
    return gsum-tsum
};

//判断丑数
// 编写一个程序判断给定的数是否为丑数。
// 丑数就是只包含质因数 2, 3, 5 的正整数。
var isUgly = function(num) {
    if(num<=0) {
        return false
    }
    let flag = true
    while(flag && num!=1) {
        flag =false
        if(num%2 === 0) {
            num=num/2
            flag = true
        }else if(num%3 === 0) {
            num=num/3
            flag=true
        }else if(num%5 === 0) {
            num=num/5
            flag=true
        }
    }
    return num === 1? true: false
};
//丑数II
//编写一个程序，找出第 n 个丑数。丑数就是质因数只包含 2, 3, 5 的正整数
var nthUglyNumber = function(n) {
    let nums=[1], find = false
    let i2=0, i3=0, i5=0;//2,3,5对应的乘数因子
    for(let i=1; i<n;i++) {
        let ugly = Math.min(nums[i2]*2, nums[i3]*3, nums[i5]*5)
        nums[i] = ugly
        if(ugly === nums[i2]*2) {
            ++i2
        }
        if(ugly === nums[i3]*3) {
            ++i3
        }
        if(ugly === nums[i5]*5) {
            ++i5
        }
    }
    console.log(nums)
    return nums[n-1]
};
var find132pattern = function(nums) {
    if(nums.length<3)
        return false
    let stack = []
    let min=[nums[0]]
    for(let i=1;i<nums.length; i++) {
        min[i] = Math.min(min[i-1], nums[i])
    }
    for(let j =nums.length-1; j>=0; j--) {
        if(nums[j] > min[j]) {
            while(stack.length>0 && stack[stack.length-1] <=min[j]) {//把栈中，比当前数字结尾最小的数小的都出栈
//             debugger;
                stack.pop()
            }
            //上一步处理后，stack里都是大于当前min[j]的， 如果栈顶比nums[j]小，符合了,stack里放的，都是当前j之后的数字，索引k<j
            if(stack.length>0 && stack[stack.length-1]<nums[j]) {
                return true
            }
            stack.push(nums[j])
        }
        console.log(j ,stack)
    }
    return false;
};
//整数转英文表示
var numberToWords = function(num) {

};

//完全平方数
//给定正整数 n，找到若干个完全平方数（比如 1, 4, 9, 16, ...）使得它们的和等于 n。你需要让组成和的完全平方数的个数最少。
var numSquares = function(n) {
    
};




//有效的数独
//判断一个 9x9 的数独是否有效。只需要根据以下规则，验证已经填入的数字是否有效即可。
var isValidSudoku = function(board) {
//     let rows = new Array(9).fill({})
//     let columns = new Array(9).fill({})
//     let boxes = new Array(9).fill({})
    let rows = Array.from(new Array(9), () => new Object())
    let columns = Array.from(new Array(9), () => new Object())
    let boxes = Array.from(new Array(9), () => new Object())
    for(let i=0;i<9; i++) {
        for(let j=0;j<9;j++) {
            let c = board[i][j]
            if(c!== '.') {
                if(!rows[i][c]) {
                    rows[i][c] = 1
                } else {
                    console.log('i j c', i , j, c, rows)
                    return false;
                }
                if(!columns[j][c]) {
                    columns[j][c] = 1
                }else {
                    console.log('column', i , j, c, columns)
                    return false
                }

                const boxIndex = Math.floor(i / 3) * 3 + Math.floor(j / 3)
                if(!boxes[boxIndex][c]) {
                    boxes[boxIndex][c] = 1
                }else {
                    return false
                }
            }
        }
    }
    return true
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
var formatData = function(x) {
    let n = x.length
    let arr = Array.from(new Array(n), () => '.'.repeat(n) )
    x.forEach((item, index) => {
        arr[index] = (arr[index].substr(0,x[index])+'Q').padEnd(n, '.')
    })
    return arr
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
//插入元素的位置
//给定一个排序数组和一个目标值，在数组中找到目标值，并返回其索引。如果目标值不存在于数组中，返回它将会被按顺序插入的位置。
//问题转换为找到数组里第一个大于或等于target的下标
var searchInsert = function(nums, target) {
    let n = nums.length
    let left =0, right = n-1
    let ans = n
    while(left<=right) {
        let mid = Math.floor((left+right)/2)
        if(target<=nums[mid]) {
            ans=mid
            right=mid-1
        }else {
            left=left+1
        }
    }
    return ans
};
//有序数组的单一元素
//给定一个只包含整数的有序数组，每个元素都会出现两次，唯有一个数只会出现一次，找出这个数。
var singleNonDuplicate = function(nums) {
    let set = new Set()
    nums.map(item => {
        if(set.has(item)) {
            set.delete(item)
        } else {
            set.add(item)
        }
    })
    return [...set][0]
};
//最长重复子数组
//给两个整数数组 A 和 B ，返回两个数组中公共的、长度最长的子数组的长度。
//动态规划
var findLength = function(A, B) {
    let m=A.length, n=B.length
    let dp = Array.from(new Array(m+1), () => new Array(n+1).fill(0))
    let ans = 0
    for(let i=m-1; i>=0;i--) {
        for(let j=n-1; j>=0; j--) {
            dp[i][j] = A[i] === B[j] ? dp[i+1][j+1]+1:0
            ans=Math.max(ans,dp[i][j])
        }
    }
    return ans
};
//滑动窗口解法
//我们可以枚举 A 和 B 所有的对齐方式。对齐的方式有两类：第一类为 A 不变，B 的首元素与 A 中的某个元素对齐；第二类为 B 不变，A 的首元素与 B 中的某个元素对齐。对于每一种对齐方式，我们计算它们相对位置相同的重复子数组即可。

var findLength = function(A, B) {
    let n=A.length, m=B.length
    let ret = 0;// 
    for(let i=0;i<n ;i++) { //A滑动和B开头对齐
        let len = Math.max(m,n-i )
        let maxLen = maxLength(A,B, i, 0, len)
        ret = Math.max(ret, maxLen);
    }
    for(let i=0; i<m;i++) {//B滑动和A开头对齐
        let len = Math.min(n, m-i) //A数组和B滑动的这部分数组的最小值
        let maxLen = maxLength(A, B, 0, i, len)
        ret = Math.max(ret, maxLen);
    }
    return ret
};
var maxLength = function(A, B, addA, addB, len) { //addA, addB为滑动的A,B数组的起始位置
    let ret = 0,k =0
    for(let i=0;i<len; i++) {
        if(A[addA+i] === B[addB+i]) {
            k++
        }else {
            k=0
        }
        ret =Math.max(ret, k)
    }
    return ret
}
//山脉数组的峰顶索引
//方法1线性扫描，知道山的高度不增长
var peakIndexInMountainArray = function(arr) {
    let i=0
    while(arr[i]<arr[i+1]) {
        i++
    }
    return i
};
//方法2二分查找
var peakIndexInMountainArray2 = function(arr) {
    let lo=0, hi=arr.length-1
    while(lo<hi) {
        let mid = Math.floor((lo+hi)/2)
        if(arr[mid] <arr[mid+1]) { //中间比他后以为小，lo下标改为mi+1
            lo=mid+1
        }else {
            hi=mid
        }
    }
    return lo
};
//将 x 减到 0 的最小操作数
//给你一个整数数组 nums 和一个整数 x 。每一次操作时，你应当移除数组 nums 最左边或最右边的元素，然后从 x 中减去该元素的值。请注意，需要 修改 数组以供接下来的操作使用。
//题目转化为属性类型，操作数等于数组总数-和等于(sum-x)的最长连续数组长度
var minOperations = function(nums, x) {
    let minVal =Math.min(...nums)
    let count
    let len = nums.length
    let sum = nums.reduce((pre,cur) => pre+cur, 0)
    let left = 0
    while(left < nums.length) {

    }
    
    
};
//搜索二维矩阵 II
//每行的元素从左到右升序排列。每列的元素从上到下升序排列。
var searchMatrix = function(matrix, target) {
    if(matrix.length === 0) {
        return false
    }
    let left = matrix[0].length-1, up=0
    while(left>=0 && up<matrix.length) {
        if(matrix[up][left] >target) {
            left--
        }else if(matrix[up][left] <target) {
            up++
        }else {
            return true
        }
    }
    return false
};

//长度最小的子数组
//给定一个含有 n 个正整数的数组和一个正整数 s ，找出该数组中满足其和 ≥ s 的长度最小的 连续 子数组，并返回其长度。如果不存在符合条件的子数组，返回 0。
var minSubArrayLen = function(s, nums) {
    let left,right=1
    let minLen=Number.MAX_VALUE
    if(nums.length === 0) return 0
    let curSum=nums[0]
    for(let i=0;i<nums.length; i++) {
        curSum= i>=1 ? curSum-nums[i-1]:curSum
        console.log('i', i, curSum)
        while(curSum<s && right<nums.length) {
            curSum=curSum+nums[right++]
            console.log('curSum', curSum)
        }
        if(curSum >=s) {
            minLen=Math.min(minLen, right-i)
            console.log(i, right, minLen)
        }
    }
    return minLen
};
//有序数组第K小元素

var kthSmallest = function(matrix, k) {

};

function* fibonacci() {
  let [prev, curr] = [0, 1];
  for (;;) {
    yield curr;
    [prev, curr] = [curr, prev + curr];
  }
}

for (let n of fibonacci()) {
  if (n > 10) break;
  console.log(n);
}
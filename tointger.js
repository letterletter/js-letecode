/*
罗马数字包含以下七种字符: I， V， X， L，C，D 和 M。
转为数字 ，通常情况下，小的数字在大的数字右边，也存在特例，
I 可以放在 V (5) 和 X (10) 的左边，来表示 4 和 9。
X 可以放在 L (50) 和 C (100) 的左边，来表示 40 和 90。 
C 可以放在 D (500) 和 M (1000) 的左边，来表示 400 和 900。

*/
var romanToInt = function(s) {
    let obj = {'I': 1, 'V': 5, 'X': 10, 'L': 50, 'C': 100, 'D': 500, 'M': 1000};
    let str = 'IVXLCDM'
    let sum = 0;
    for(let i=0; i< s.length-1;i++) {
        if(str.indexOf(s.charAt(i)) < str.indexOf(s.charAt(i+1))) {
            sum = sum - obj[s.charAt(i)];
        }else {
            sum = sum + obj[s.charAt(i)]
        }
    }
    sum = sum+obj[s.charAt(s.length-1)]
    return sum;
};

/**
给定一个排序数组，你需要在 原地 删除重复出现的元素，使得每个元素只出现一次，返回移除后数组的新长度。

不要使用额外的数组空间，你必须在 原地 修改输入数组 并在使用 O(1) 额外空间的条件下完成。

*/

var removeDuplicates = function(nums) {
   if(nums.length === 0) {
       return 0;
   }
   let i = 0;
   for(let j = 1; j<nums.length ;j++) {
       if(nums[j] !== nums[i]) {
           nums[++i] = nums[j]
       }
   }
   return i+1;
};

//整数转罗马数字
var intToRoman = function(num) {
    let values = [1000, 900, 500, 400, 100, 90, 50, 40, 10, 9, 5, 4, 1]
    let symbols = ["M","CM","D","CD","C","XC","L","XL","X","IX","V","IV","I"]
    let str = ''
    let obj = new Map([[1000, 'M'],[900, 'CM'], [500, 'D'], [400, 'CD'],[100, 'C'], [90, 'XC'],[50, 'L'], [40, 'XL'], [10, 'X'], [9, 'XL'], [5, 'V'], [4, 'IV'], [1, 'I']])
    let test = {1000: 'M', 900: 'CM', 500: 'D', 400: 'CD', 100: 'C', 90: 'XC', 50: 'L', 40: 'XL', 10: 'X', 9: 'IX', 5: 'V', 4: 'IV', 1: 'I'}
    for(let i=0;i<values.length&&num>0; i++) {
        while(values[i]<=num) { //重复，知道部能再加
            num = num-values[i];
            str=str+symbols[i]
            console.log(str)
        }
    }
    return str;
};

/**
给定两个整数，被除数 dividend 和除数 divisor。将两数相除，要求不使用乘法、除法和 mod 运算符。

返回被除数 dividend 除以除数 divisor 得到的商。

整数除法的结果应当截去（truncate）其小数部分，例如：truncate(8.345) = 8 以及 truncate(-2.7335) = -2
*/
var divide = function(dividend, divisor) {
    var res = 0
    let sign = dividend>0 ? (divisor>0?'': '-'):(divisor>0?'-':'')
    dividend = Math.abs(dividend);
    divisor = Math.abs(divisor)

};

//给你一个未排序的整数数组，请你找出其中没有出现的最小的正整数。


var firstMissingPositive = function(nums) {
    let positiveArr = nums.filter(item => item>0)
    console.log(positiveArr)
    let min = Math.min(...positiveArr)
    let res
    if(min>1) {
        return 1;
    }else {
        for(let i =min; ;i++) {
            if(!positiveArr.includes(i)) {
                res = i;
                break;
            }
        }
        return res;
    }
};

//实现 pow(x, n) ，即计算 x 的 n 次幂函数。

//递归
var myPow = function(x, n) {
        if(n === 0) {
        return 1;
    }
    if(n < 0) {
        return 1/myPow(x, -n)
    }
    else {
        let b =  myPow(x, parseInt(n/2))
        return n%2 === 0 ? b*b
        : x*b*b
    }
};

//迭代


//x 的平方根
//袖珍计算器法 x的1/2次方等于e的0.5*lnx
//由于计算机无法存储浮点数的精确值,运算过程可能会存在误差，得到整数部分ans 后，我们应当找出ans 与ans+1 中哪一个是真正的答案。

var mySqrt = function(x) {
    if(x === 0) {
        return 0
    }
    let ans = parseInt(Math.exp(0.5*Math.log(x)))
    return (ans+1)*(ans+1) <=x ? ans+1: ans
};
//二分查找 二分查找的下界为 00，上界可以粗略地设定为 xx。在二分查找的每一步中，我们只需要比较中间元素 \textit{mid}mid 的平方与 xx 的大小关系，并通过比较的结果调整上下界的范围。

var mySqrt2 = function(x) {
    if(x === 0) {
        return 0
    }
    let l=0; r=x, ans=-1;
    while(l<=r) {
        let mid = parseInt(l+(r-l)/2)
        console.log(mid, l,r)
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
};


//和为s的两个数字
var twoSum = function(nums, target) {
    let left = 0; right = nums.length-1;
    while(left< right) {
        if(nums[left]+nums[right] === target) {
            return [nums[left], nums[right]];
        }else if(nums[left]+nums[right] < target) {
            left++;
        }else if(nums[left]+nums[right] > target) {
            right--;
        }
    }
    return [-1, -1]
};
//四数相加
// 给定四个包含整数的数组列表 A , B , C , D ,计算有多少个元组 (i, j, k, l) ，使得 A[i] + B[j] + C[k] + D[l] = 0。

// 为了使问题简单化，所有的 A, B, C, D 具有相同的长度 N，且 0 ≤ N ≤ 500 。所有整数的范围在 -228 到 228 - 1 之间，
//最终结果不会超过 231 - 1 。
var fourSumCount = function(A, B, C, D) {
    let countAB = new Map();
    A.map(item => {
        B.map(item2 => {
            countAB.set(item+item2, (countAB.get(item+item2)||0) +1)
        })
    })
    let ans = 0
   C.map(item => {
       D.map(itemD => {
           if(countAB.has(-(item+itemD))) {
               ans+=countAB.get(-item-itemD);//countAB中出现次数
           }
       })
   })
   return ans;
};

//合并两个有序链表
//迭代
var mergeTwoLists = function(l1, l2) {
    let pHead = new ListNode(-1);
    let prev = pHead;
    while(l1&&l2) {
        if(ll.val<=l2.val) {
            prev.next = l1;
            l1=l1.next;
        }else {
            prev.next = l2;
            l2 = l2.next
        }
        prev = prev.next
    }
    prev.next = l1?l1:l2
    return pHead.next;
};
//递归
var mergeTwoLists2 = function(l1, l2) {
    if (l1 === null) {
        return l2;
    } else if (l2 === null) {
        return l1;
    } else if (l1.val < l2.val) {
        l1.next = mergeTwoLists(l1.next, l2);
        return l1;
    } else {
        l2.next = mergeTwoLists(l1, l2.next);
        return l2;
    }
};
//给你一个包含 n 个整数的数组 nums，判断 nums 中是否存在三个元素 a，b，c ，使得 a + b + c = 0 ？请你找出所有满足条件且不重复的三元组。
//三数和等于0， 
var threeSum = function(nums) {
    let arr = nums.sort((a,b) => a-b);//升序排序
    if(arr[arr.length-1]<0) {
        return []
    }
    let res = []
    let left, right, sum=0
    // console.log('arr', arr)
    for(let i=0;i<arr.length-2;i++) {
        if(arr[i] >0) {
            break;
        }
        if(i>0&&arr[i] === arr[i-1]) {
            continue;
        }
        left = i+1; 
        right = arr.length-1
        while(left<right) {
            if(arr[i]*arr[right] >0) break; //两边的同号，即3个数同号，无解，退出循环
            sum = arr[left]+arr[right]+arr[i]
            if(sum === 0) {
                res.push([arr[i] , arr[left], arr[right]])
            }
            if(sum<0) { //left右移并跳过重复的
                while(arr[left] === arr[++left]) {}
            } else {
                while(arr[right] === arr[--right]) {}
            }
        }
    }
    return res;
};

//两两交换链表中的节点 迭代
var swapPairs = function(head) {
    let dummyNode = new ListNode(0)
    dummyNode.next = head
    let temp = dummyNode
    while(temp.next && temp.next.next) {
        let node1 = temp.next
        let node2 = temp.next.next
        temp.next = node2
        node1.next = node2.next;
        node2.next = node1
        temp = node1;//
    }
    return dummyNode.next
};
//递归
var swapPairs2 = function(head) {
    if (head === null|| head.next === null) {
        return head;
    }
    const newHead = head.next;
    head.next = swapPairs(newHead.next);
    newHead.next = head;
    return newHead;
};


//四数相加  
//给定一个包含 n 个整数的数组 nums 和一个目标值 target，判断 nums 中是否存在四个元素 a，b，c 和 d ，使得 a + b + c + d 的值与 target 相等？找出所有满足条件且不重复的四元组。
/**
 * @param {number[]} nums
 * @param {number} target
 * @return {number[][]}
 */
var fourSum = function(nums, target) {
    let res = []
    let len = nums.length
    if(nums.length <4) {
        return res; //长度小于4，直接处理
    }
    nums.sort((a,b) => a-b); //升序排序
    for(let i=0;i<len-3; i++) {
        if(i>0&& nums[i] === nums[i-1]) continue;//去重
        if(nums[i]+nums[i+1]+nums[i+2]+nums[i+3]>target) { //i以及它后面的相加，已经超过target,不用比了，再往后都会比target大
            break;
        }
        for(let j=i+1; j<len-2; j++) {
            if(j>i+1&&nums[j] === nums[j-1]) {
                continue;//跳过重复的
            }
            let left = j+1; let right = len-1;
            while(left<right) {
                const sum = nums[i]+nums[j]+nums[left]+nums[right];
                if(sum === target) {
                    res.push([nums[i], nums[j], nums[left] ,nums[right]])
                }
                if(sum<=target) { //等于或小于，左指针右移都要去重
                    while(nums[left] === nums[++left]) {}
                }else {
                    while(nums[right] === nums[--right]) {}
                }
            }
        }
    }
    return res;
 };
 //给定一个只包含 '(' 和 ')' 的字符串，找出最长的包含有效括号的子串的长度。

 var longestValidParentheses = function(s) {
    let arr = []
    let res = 0
    let sarr = [...s]
    for(let [i,c] of sarr.entries()) {
        if(c === '(') {
            arr.push(c)
            if(arr[arr.length-1] === '(') {
                break;
            }
        }else if(c === ')') {
            if(arr.length>=1 && arr[arr.length-1] === '(') {
                res = res+2;
                arr.pop()
            } else {
                arr.push(c)
                break;
            }
        }
    }
    return res;
};

//螺旋矩阵  给定一个包含 m x n 个元素的矩阵（m 行, n 列），请按照顺时针螺旋顺序，返回矩阵中的所有元素。

var spiralOrder = function(matrix) {    
    let m = matrix.length; //行数
    let n = matrix[0].length //列数
    let arr = []
    let left = 0, right = n-1, top=0, bottom = m-1; //左右上下
    while(left<=right && top<=bottom) {
        for(let i=left;i<=right;i++) {
            arr.push(matrix[top][i])
        }
        for(let j=top+1;j<=bottom; j++) {
            arr.push(matrix[j][right])
        }
        if(left<right&&top<bottom) {
            for(let j=right-1;j>left;j--) {
                arr.push(matrix[bottom][j]) //从右往左
            }
            for(let i=bottom; i>top; i--) {//从下往上
                arr.push(matrix[i][left])
            }
        }
        left++;
        right--;
        top++;
        bottom--;
    }
    return arr;
};

//跳跃游戏 给定一个非负整数数组，你最初位于数组的第一个位置。

// 数组中的每个元素代表你在该位置可以跳跃的最大长度。

// 判断你是否能够到达最后一个位置。
/**
 * @param {number[]} nums
 * @return {boolean}
 */
var canJump = function(nums) {
    let rightmax = 0 ;//向右走的最远距离
    for(let i=0;i<nums.length;i++) {//遍历每个元素，如果她的下标<=rightmax, 更新最远距离
        if(i<=rightmax) { //
            rightmax = Math.max(rightmax, i+nums[i]);
            if(rightmax>=n-1) {
                return true;
            }
        }
        else {//当前下标大于最远的距离
            break;
        }
    }
    return false;
};

//合并区间
//给出一个区间的集合，请合并所有重叠的区间。
var merge = function(intervals) {
    if(intervals.length <=1) {
        return intervals;
    }
    let res = []
    intervals.sort((item1, item2) => {
        if(item1[0]>item2[0]) {
            return 1;
        }
        if(item1[0]===item2[0]) {
            return item1[1]-item2[1];
        }
        if(item1[0] <item2[0]) {
            return -1;
        }
    })
    let cur = intervals[0]
    for(let i=1; i<intervals.length; i++) {
        console.log('cur', cur, intervals[i])
        if(intervals[i][0]<=cur[1]) {
            cur[1]=Math.max(cur[1], intervals[i][1])
        }else {
            res.push(cur)
            cur = intervals[i]
        }
    }
    res.push(cur)
    return res;
};
//只出现一次的数字
//使用位运算。使用异或运算，任何数和0做异或运算，结果仍然是原来的数；任何数和其自身做异或运算，结果是 0，异或运算满足交换律和结合律
var singleNumber = function(nums) {
    let res = 0
    for(let i of nums ) {
        res^=i
    }
    return res;
};
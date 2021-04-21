//盛最多水的容器
//给你 n 个非负整数 a1，a2，...，an，每个数代表坐标中的一个点 (i, ai) 。在坐标内画 n 条垂直线，垂直线 i 的两个端点分别为 (i, ai) 和 (i, 0) 。找出其中的两条线，使得它们与 x 轴共同构成的容器可以容纳最多的水。
/**
 * @param {number[]} height
 * @return {number}
 */
var maxArea = function(height) {
    let left = 0, right=height.length-1
    let res = 0
    while(left<right) {
        let tem = Math.min(height[left], height[right])*(right-left)
        console.log(tem)
        res = tem>res?tem:res
        height[left]<height[right] ? (left++):(right--)
    }
    return res;
};
//最大子序和
var maxSubArray = function(nums) {
    let arr = new Array(nums.length).fill(0)
    arr[0] = nums[0]
    let max = arr[0]
    for(let i=1;i< nums.length; i++) {
        if(arr[i-1]>0) {
            arr[i] = arr[i-1]+nums[i]
        }
        else {
            arr[i] = nums[i]
        }
        max = arr[i] >max ? arr[i]:max
    }
    return max;
};
//合并两个有序数组 
//给你两个有序整数数组 nums1 和 nums2，请你将 nums2 合并到 nums1 中，使 nums1 成为一个有序数组
//初始化 nums1 和 nums2 的元素数量分别为 m 和 n 。
// 你可以假设 nums1 有足够的空间（空间大小大于或等于 m + n）来保存 nums2 中的元素。
var merge = function(nums1, m, nums2, n) {
    if(m<=0) {
        for(let [i,v] of nums2.entries()) {
            nums1[i] = v
        }
        return nums1
    }
    let cur = m+n-1
    let num1point = m-1, num2point=n-1
    while(num1point>=0 && num2point>=0) {
        if(nums1[num1point]<=nums2[num2point]) {
            nums1[cur] = nums2[num2point]; 
            num2point--;
            cur--;
        }else {
            nums1[cur] = nums1[num1point]; 
            num1point--;
            cur--
        }
    }
    while(num2point>=0) {
        nums1[cur--] = nums2[num2point--]
    }
    return nums1
};
//矩阵置零
//给定一个 m x n 的矩阵，如果一个元素为 0，则将其所在行和列的所有元素都设为 0。请使用原地算法。
var setZeroes = function(matrix) {
    let flagarr = Array.from(new Array(matrix.length), () => (new Array(matrix[0].length).fill(false)))
    matrix.map((item, i) => {
        item.map((ii, j) => {
            ii===0 ? flagarr[i][j]=true:''
        })
    })
    flagarr.map((item, i) => {
        let rowzero = item.some(ii => ii===true)   //只要这一行有一个为true,这一行都为0
        rowzero && matrix[i].fill(0,0, matrix[0].length)
        if(rowzero) {
            item.map((ii, j) => {
                if(ii) {
                    matrix.map(item => item[j]=0)
                }
            })
        }
    })
    return matrix
};
//加一 
// 给定一个由 整数 组成的 非空 数组所表示的非负整数，在该数的基础上加一。

// 最高位数字存放在数组的首位， 数组中每个元素只存储单个数字。

// 你可以假设除了整数 0 之外，这个整数不会以零开头。
var plusOne = function(digits) {
    let len = digits.length
    if(digits[len-1]+1>=10) {
        digits[len-1]= (digits[len-1]+1)%10
        if(len ===1) {
            digits.unshift(1)
        }else {
            len--;
            digits[len-1]++
            while(digits[len-1]>=10&&len>=1) {
                digits[len-1]%=10
                len--
                len>=1 && digits[len-1]++
                if(len === 0) {
                    digits.unshift(1)
                }
            }
        }
    }
    else {
        digits[len-1]=digits[len-1]+1
    }
    return digits
};

//爬楼梯 
//需要 n 阶你才能到达楼顶。每次你可以爬 1 或 2 个台阶。你有多少种不同的方法可以爬到楼顶呢？
//n为0是0种，n为1是一种
var climbStairs = function(n) {
    let p=0,q=0,r=1;
    for(let i=1;i<=n;i++) {
        p=q;
        q=r;
        r=p+q
    }
    return r;
};

//搜索二维矩阵
//编写一个高效的算法来判断 m x n 矩阵中，是否存在一个目标值。该矩阵具有如下特性：每行中的整数从左到右按升序排列。每行的第一个整数大于前一行的最后一个整数。
//方法1，扁平化数组，然后使用includes
var searchMatrix = function(matrix, target) {
    if(matrix.length === 0) {
        return false
    }
    let m = matrix.length, n= matrix[0].length
    //二分查找
    let left=0,right=m*n-1
    let privotIdx, privotElement
    while(left<=right) {
       privotIdx = parseInt((left+right)/2)
       privotElement=matrix[parseInt(privotIdx/n)][privotIdx%n]
       console.log(privotIdx, privotElement, left,right)
       if(privotElement === target) return true
       else {
           target<privotElement?(right=privotIdx-1) : (left=privotIdx+1)
       }
    }
    return false

};
//二进制求和
//给你两个二进制字符串，返回它们的和（用二进制表示）。输入为 非空 字符串且只包含数字 1 和 0。
var addBinary = function(a, b) {
    let res = '', friArr, secArr
    let arrOfA=[...a].reverse()
    let arrOfB = [...b].reverse()
    let [largeArr, smallArr] = a.length>=b.length ? [arrOfA, arrOfB] : [arrOfB, arrOfA]
    console.log(largeArr, smallArr)
    let carryBit = 0 //进位
    for(let [i, item] of largeArr.entries()) {
        let v = carryBit+ (i<smallArr.length ?(smallArr[i]-'0'):0) +  (item-'0')
        console.log(v, largeArr[i]-'0', item-'0')
        largeArr[i] = (v%2).toString()
        carryBit = v>=2 ? 1:0 
        if(i>smallArr.length && carryBit === 0) {
            break;
        }
    }
    if(carryBit>0) {
        largeArr.push('1')
    }

    return largeArr.reverse().join('')
};

//删除排序数组中的重复项，使每个元素最多出现两次，返回移除后数组的新长度
//删除多余重复项
var removeDuplicates = function(nums) {
    let n =nums.length
    if(n<3) {
        return n;
    }
     let count=1, i=1;
     while(i<n) {
         if(nums[i] === nums[i-1]) {
             count++;
             console.log(i, count)
         }else {
             if(count>2) {
                 let delcount = count-2
                 nums.splice(i-delcount, delcount)
                 n=n-delcount
                 i=i-delcount
             }
             count =1
         }
         i++;
     }
     if(count > 2) {//若到数组最后一位处理完，最后这位count大于2，继续减
         let delcount = count-2
         nums.splice(i-delcount, delcount)
         n=n-delcount
     }
     console.log(n)
    return nums
};

//删除多余项 ，使用覆盖多余的重复项
// 我们使用了两个指针，i 是遍历指针，指向当前遍历的元素；j 指向下一个要覆盖元素的位置。
// 同样，我们用 count 记录当前数字出现的次数。count 的最小计数始终为 1。
// 我们从索引 1 开始一次处理一个数组元素。
// 若当前元素与前一个元素相同，即 nums[i]==nums[i-1]，则 count++。若 count > 2，则说明遇到了多余的重复项。在这种情况下，我们只向前移动 i，而 j 不动。
// 若 count <=2，则我们将 i 所指向的元素移动到 j 位置，并同时增加 i 和 j。
// 若当前元素与前一个元素不相同，即 nums[i] != nums[i - 1]，说明遇到了新元素，则我们更新 count = 1，并且将该元素移动到 j 位置，并同时增加 i 和 j。
// 当数组遍历完成，则返回 j。
var removeDuplicates2 = function(nums) {
    let j=1, count =1;
    for(let i=0; i<nums.length; i++) {
        if(nums[i] === nums[i--]) {
            count++;
        }else {
            count =1;
        }
        if(count<=2) {
            nums[j++] = nums[i]
        }
    }
    return j;
};
//颜色分类
// 给定一个包含红色、白色和蓝色，一共 n 个元素的数组，原地对它们进行排序，使得相同颜色的元素相邻，并按照红色、白色、蓝色顺序排列。
// 此题中，我们使用整数 0、 1 和 2 分别表示红色、白色和蓝色。
//法一，先统计0,1,2数目，再重组数组
var sortColors = function(nums) {
    let count = [0,0,0]
    nums.map(item => {
        count[item]++
    })
    nums.fill(0, 0, count[0])
    nums.fill(1, count[0], count[0]+count[1])
    nums.fill(2, count[0]+count[1], nums.length)
    return nums
};
//双指针法，用指针p0交换0，p1来交换1，
//因为连续的 0 之后是连续的 1,将0与nums[p0]交换，可能会把一个1交换出去，因此，若p0<p1,需要再将nums[i]与nums[p1]进行交换
var sortColors2 = function(nums) {
    let n = nums.length
    let p0=0,p1=0
    for(let  i=0;i<n;++i) {
        if(nums[i] === 1) {
            [nums[i], nums[p1]] = [nums[p1], nums[i]]
            ++p1;
        }else  if(nums[i] === 0) {
            [nums[i], nums[p0]] = [nums[p0], nums[i]]
            if(p0<p1) {
                [nums[i], nums[p1]] = [nums[p1], nums[i]]
            }
            ++p0;
            ++p1;
        }
    }
    return nums
}

//杨辉三角
var generate = function(numRows) {
    let arr = []
    for(let i=0;i<numRows; i++) {
        let temarr = new Array(i+1).fill(1)
        let len = i+1;//当前数组长度
        for(let j=1;j<=i;j++) {
            temarr[j] = arr[i-1][j-1]+(j<arr[i-1].length ? arr[i-1][j]:0)
            console.log(i, j, temarr[j])
        }

        arr.push(temarr)
    }
//     for(let i=0;i<numRows; i++) {
//         let temarr =[1]
//         let len = i+1;//当前数组长度
//         let mid = len%2 === 0? (len/2-1):parseInt(len/2)
//         console.log('len midindex', len, mid)
//         for(let j=1;j<mid;j++) {
//             temarr.push(arr[i-1][j-1]+arr[i-1][j])
//         }
//         console.log('before compare', temarr)
//         if(mid<len-1) {
//             temarr.push(...temarr.slice(0, mid).reverse())
//         }
//         console.log('temarr',temarr)
//         arr.push(temarr)
//     }
    return arr
};

var generate2 = function(numRows) {
    let arr = []
    for(let i=0;i<numRows; i++) {
        let temarr =[1]
        let len = i+1;//当前数组长度
        let mid = len%2 === 0? (len/2-1):parseInt(len/2)
        console.log('len midindex', len, mid)
        for(let j=1;j<=mid;j++) {
            temarr.push(arr[i-1][j-1]+arr[i-1][j])
        }
        console.log('before compare', temarr)
        if(mid<=len-1) {
            mid = len%2 === 0 ? mid+1:mid
            temarr.push(...temarr.slice(0, mid).reverse())
        }
        console.log('temarr',temarr)
        arr.push(temarr)
    }
    return arr
};

//杨辉三角2 ，给定一个飞空索引k<其中k<=33，返回杨辉三角第k行
var getRow = function(rowIndex) {
    let arr = []
    for(let i=0;i<numRows; i++) {
        let temarr =[1]
        let len = i+1;//当前数组长度
        let mid = len%2 === 0? (len/2-1):parseInt(len/2)
        for(let j=1;j<=mid;j++) {
            temarr.push(arr[i-1][j-1]+arr[i-1][j])
        }
        console.log('before compare', temarr)
        if(mid<=len-1) {
            mid = len%2 === 0 ? mid+1:mid
            temarr.push(...temarr.slice(0, mid).reverse())
        }
        arr.push(temarr)
    }
    return arr[rowIndex-1]
};

//最长连续子序列
var longestConsecutive = function(nums) {
    if(nums.length === 0) {
        return 0;
    }
    nums.sort((a,b) => a-b)  //升序
    let dp = new Array(nums.length).fill(1)  //表示以当前索引数字结尾的最长联系序列长度
    let max = 1
    for(let i=1;i<nums.length; i++) {
        if(nums[i]-nums[i-1] === 1) {
            dp[i] +=dp[i-1]
            dp[i]> max && (max=dp[i])
        }
        if(nums[i] === nums[i-1]) { //当前和它上一位相同，当前数字结尾的长度更新
            dp[i] = dp[i-1]
        }
    }
    return max
};

//乘机最大子数组， 可能包含负数
//给你一个整数数组 nums ，请你找出数组中乘积最大的连续子数组（该子数组中至少包含一个数字），并返回该子数组所对应的乘积。
var maxProduct = function(nums) {
    let maxF = nums[0], minF = nums[0] ,snas = nums[0]
    for(let i=1;i<nums.length; i++) {
        let mx = maxF, mn=minF
        maxF=Math.max(mx*nums[i], Math.max(nums[i], mn*nums[i]))
        minF = Math.min(mn*nums[i], Math.min(nums[i], mx*nums[i]))
        ans = Math.max(maxF, ans) //每次取当前maxF和之前ans中最大者
    }
    return ans
};
//寻找旋转排序数组中的最小值,数组中所有数字都唯一

var findMin = function(nums) {
    if(nums.length === 1) {
        return nums[0]
    }
    if(nums[0]<nums[nums.length-1]) {//还是升序，没有被旋转
        return nums[0]
    }
    let left =0, right=nums.length-1
    while(left<right) {
        let mid = parseInt((left+right)/2)
        if(nums[mid] >nums[mid+1]) { //mid位置比mid+1位置数大， 找到最小
            return nums[mid+1]
        }
        if(nums[mid-1] >nums[mid]) {  //在mid位置下降
            return nums[mid]
        }
        if(nums[mid]>nums[0]) {//中间位置比第一个位置大，中间以右产生旋转点
            left=mid+1
        }else {//中间位置比第一个位置小，
            right=mid-1
        }
    }
    return -1
};

//搜索旋转排序数组，不含重复元素
//给你一个整数数组 nums ，和一个整数 target 。该整数数组原本是按升序排列，但输入时在预先未知的某个点上进行了旋转。请你在数组中搜索 target ，如果数组中存在这个目标值，则返回它的索引，否则返回 -1 
var search2 = function(nums, target) {
    let len = nums.length
    if(len === 0) return -1
    if(len === 1) return nums[0]===target ? 0:-1
    let left = 0, right = len-1
    while(left<=right) {
        let mid = parseInt((left+right)/2)
        console.log('mid', mid)
        if(nums[mid] === target) {
            return mid;
        }

        if(nums[left] <=nums[mid]) {//这部分升序
            if(nums[left] <=target && target<nums[mid]) {
                right = mid-1
            }else {
                left = mid+1
            }
        }else {
            if(nums[mid] <target && target<=nums[right]) {
                left= mid+1
            }else {
                right = mid-1
            }
        }
        console.log('left right', left, right)

    }
    return -1
};

//搜索排序数组II，返回true,false，nums可能包含重复元素
//法一，先去重，再按照search2查
var search3 = function(nums, target) {
    let len = nums.length
    if(len === 0) return false
    if(len === 1) return nums[0]===target ? true:false
    nums = Array.from(new Set(nums))
    len = nums.length
    let left = 0, right = len-1
    while(left<=right) {
        let mid = parseInt((left+right)/2)
        if(nums[mid] === target) {
            return true;
        }

        if(nums[left] <=nums[mid]) {//这部分升序
            if(nums[left] <=target && target<nums[mid]) {
                right = mid-1
            }else {
                left = mid+1
            }
        }else {
            if(nums[mid] <target && target<=nums[right]) {
                left= mid+1
            }else {
                right = mid-1
            }
        }

    }
    return false
};
//最大矩形
//给定一个仅包含 0 和 1 、大小为 rows x cols 的二维二进制矩阵，找出只包含 1 的最大矩形，并返回其面积。
var maximalRectangle = function(matrix) {
    if(matrix.length === 0) {
        return 0
    }
    let row = matrix.length, column = matrix[0].length
    let dp = Array.from(new Array(row), () => new Array(column).fill(0))
    let width = Array.from(new Array(row), () => new Array(column).fill(0))
    let height = Array.from(new Array(row), () => new Array(column).fill(0))
    let max = -1
    dp[0][0] =width[0][0] = height[0][0] = matrix[0][0] === '1'?1:0
    for(let j=1;j<column; j++) {
        if(matrix[0][j] ==='1') {
            dp[0][j] = width[0][j] = 1+dp[0][j-1]
            height[0][j] = 1
            max=Math.max(max, dp[0][j])
        }
    }
    for(let i=1;i<row; i++) {
        if(matrix[i][0] ==='1') {
            dp[i][0] = height[i][0] = 1+dp[i-1][0]
            width[i][0]=1
            max=Math.max(max, dp[i][0])
        }
    }
    for(let i=1;i<row;i++) {
        for(let j=1;j<column; j++) {
            if(matrix[i][j]!=='0') {
                width[i][j] = 1+width[i][j-1]
                height[i][j] = 1+height[i-1][j]
                if(matrix[i][j-1] === '0'||matrix[i-1][j] === '0'||matrix[i-1][j-1] === '0') {
                    dp[i][j] =Math.max(width[i][j], height[i][j])
                }else {
                    if(height[i][j] === 2) {
                        dp[i][j]= Math.max(width[i][j], height[i][j], Math.min(width[i][j], width[i-1][j])*2)
                    }else {
                        let arr = [width[i][j]]  //arr存放不同高度的面积，width[i][j]表示高度为1
                        let a =[width[i][j]]
                        for(let h=2;h<=height[i][j]; h++) {
                            a.push(width[i-h+1][j])
                            arr.push(Math.min(...a)*h)
                        }
                        dp[i][j] = Math.max(...arr)
                    }
                }
            }
        }
    }
    return  Math.max(...dp.flat()) 
};
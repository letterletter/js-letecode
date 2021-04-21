//给定一个字符串，请你找出其中不含有重复字符的 最长子串 的长度。
var lengthOfLongestSubstring = function(s) {
    let temstr=''
    let arr = [...s]
    let maxlength = 0
    let findex = 0
    let str = ''
    console.log(arr)
    arr.map((item,index) => {
        if(!temstr.includes(item)) {
            temstr = temstr+item
            console.log('temstr', temstr, )
        }else {
            maxlength = Math.max(maxlength, temstr.length);
            str = s.substring(findex, index)
            findex = str.indexOf(item)+1  //lastIndexOf
            console.log('str', str,findex)
            console.log('max', temstr, maxlength,str.substr(findex))
            if(!str.substr(findex)) {
                temstr = str.substr(findex) + item
                findex = index;
            }else {
              temstr = str.substr(findex) + item

            }
            console.log('temstr', temstr, index)
        }
    })
    maxlength = Math.max(maxlength, temstr.length);
//     conso
    return maxlength;
};

var lengthOfLongestSubstring2 = function(s) {
    let temstr=''
    let arr = [...s]
    let maxlength = 0
    let findex = 0
    console.log(arr)
    for(let [key, value] of arr) {
        console.log(key, value)
    }
    arr.map((item,index) => {
        if(!temstr.includes(item)) {
            temstr = temstr+item
            console.log('temstr', temstr, )
        }else {
            maxlength = Math.max(maxlength, temstr.length);
            let str = s.substring(findex, index)
            findex = str.lastIndexOf(item)+1;//重复时'ssdddaad'
            console.log('max', temstr, maxlength,str.substr(findex))
            temstr = str.substr(findex) + item
        }
    })
    maxlength = Math.max(maxlength, temstr.length);
    return maxlength;
};
//滑动窗口
var lengthOfLongestSubstring3 = function(s) {
    // 哈希集合，记录每个字符是否出现过
    const occ = new Set();
    const n = s.length;
    // 右指针，初始值为 -1，相当于我们在字符串的左边界的左侧，还没有开始移动
    let rk = -1, ans = 0;
    for (let i = 0; i < n; ++i) {
        if (i != 0) {
            // 左指针向右移动一格，移除一个字符
            occ.delete(s.charAt(i - 1));
        }
        while (rk + 1 < n && !occ.has(s.charAt(rk + 1))) {
            // 不断地移动右指针
            occ.add(s.charAt(rk + 1));
            ++rk;
        }
        // 第 i 到 rk 个字符是一个极长的无重复字符子串
        ans = Math.max(ans, rk - i + 1);
    }
    return ans;
}
/**
我们就可以使用「滑动窗口」来解决这个问题了：

我们使用两个指针表示字符串中的某个子串（的左右边界）。其中左指针代表着上文中「枚举子串的起始位置」，而右指针即为上文中的 r
 ；

在每一步的操作中，我们会将左指针向右移动一格，表示 我们开始枚举下一个字符作为起始位置，然后我们可以不断地向右移动右指针，但需要保证这两个指针对应的子串中没有重复的字符。在移动结束后，这个子串就对应着 以左指针开始的，不包含重复字符的最长子串。我们记录下这个子串的长度；

在枚举结束后，我们找到的最长的子串的长度即为答案。

*/

/**
给出一个 32 位的有符号整数，你需要将这个整数中每位上的数字进行反转。
假设我们的环境只能存储得下 32 位的有符号整数，则其数值范围为 [−231,  231 − 1]。
*/
var reverse = function(x) {
    let str = x.toString()
    console.log(str)
    let symbol = str.charAt(0) === '-' ? -1: 1
    let temstr = str.charAt(0) === '-' ? str.substr(1): str
    let res = [...temstr].reverse().join('')
    res = symbol*parseFloat(res);
    console.log(res)
    if(res < (-1*2**31)||res> (2**31-1)) {
        res = 0
    }
    console.log(res)
    return res
};

var reverse2 = function(x) {
    let symbol = x >=0 ? 1:-1
    let res = 0
    let x2 = Math.abs(x)
    while(x2!=0) {
        res = res*10 + x2%10
        x2 = parseInt(x2/10);
    }
    res = res*symbol
    if(res < (-1*2**31)||res> (2**31-1)) {
        res = 0
    }
    console.log(res)
    return res
};
//判断回文数
var isPalindrome = function(x) {
    if(x<0) {
        return false;
    }else {
        let str = x.toString()
        str = [...str].reverse()
        if(str.join('') === x.toString()) {
            return true;
        }
        return false;
    }
};

//股票最大利润
// 给定一个数组，它的第 i 个元素是一支给定股票第 i 天的价格。
// 如果你最多只允许完成一笔交易（即买入和卖出一支股票一次），设计一个算法来计算你所能获取的最大利润。不能在买入前卖出

var maxProfit = function(prices) {
    let minval = prices[0]
    let maxprofit = 0
    for(let i=1;i<prices.length; i++) {
        if(prices[i] < minval) {
            minval = prices[i]
        }else if(prices[i] - minval > maxprofit) { //每个遍历到i处时，minval都是这项前面这些数据中最小值,只要当前项减去最小大于最大利润，更新
            maxprofit = prices[i] - minval; //更新maxprofit
        }
    }
    return maxprofit;

}

//买卖股票II
// 给定一个数组，它的第 i 个元素是一支给定股票第 i 天的价格。设计一个算法来计算你所能获取的最大利润。你可以尽可能地完成更多的交易（多次买卖一支股票）。
// 注意：你不能同时参与多笔交易（你必须在再次购买前出售掉之前的股票）。
//贪心算法
var maxProfit2 = function(prices) {
    let ans = 0
    for(let i=1;i<prices.length; i++) {
        ans+=Math.max(0, prices[i]-prices[i-1])
    }
    return ans
};
var maxProfitdp = function(prices) {
    let ans = 0
    for(let i=1;i<prices.length; i++) {
        ans+=Math.max(0, prices[i]-prices[i-1])
    }
    return ans
};

//买股票3  给定一个数组，它的第 i 个元素是一支给定的股票在第 i 天的价格。设计一个算法来计算你所能获取的最大利润。你最多可以完成 两笔 交易。


//跳跃游戏
// 给定一个非负整数数组，你最初位于数组的第一个位置。数组中的每个元素代表你在该位置可以跳跃的最大长度。你的目标是使用最少的跳跃次数到达数组的最后一个位置
//顺藤摸瓜式
var jump = function(nums) {
    let end = 0 //
    let step = 0
    let maxPosition = 0
    for(let i=0;i<nums.length-1;i++) {
        maxPosition = Math.max(maxPosition, i+nums[i]) //更新跳到最远的距离
        if(i === end) {//遇到边界，更新边界，步数加一
            end = maxPosition
            step++
        }
    }
    return step;
};



class MyArray extends Array {
    //覆盖父类Array的构造函数
    static get [Symbol.species] () {
        return Array;
    }
}

/**
给定一个字符串 s，找到 s 中最长的回文子串。你可以假设 s 的最大长度为 1000。

*/
//动态规划   P(i,j)P(i,j) 表示字符串 ss 的第 ii 到 jj 个字母组成的串（下文表示成 s[i:j]s[i:j]）是否为回文串
//状态转移方程为 P(i,j) = p(i+1, j-1)&&(si===sj) ; p(i, i) = 1, p(i,i+1) = si === s(i+1)
var longestPalindrome = function(s) {
    let len = s.length
    let arr = Array.from(new Array(len), () => (new Array(len).fill(0)))
    let res = ''
    for(let l=0;l<len;l++) {//l为从i位置加上的长度长度，以i开始，长度为l+1
        for(let i =0; i+l<len; ++i) { //满足长度为l的最后一个下标是i=n-1-l
            let j = i+l;
            if(l === 0) {
                arr[i][j] = 1
            }else if(l === 1) {
                arr[i][j] = s.charAt(i) === s.charAt(j);
            }else {
                arr[i][j] = (s.charAt(i) === s.charAt(j)) && arr[i+1][j-1]
            }

            if(arr[i][j] && l+1 >res.length) {
                res = s.substr(i, l+1)
            }

        }
    }
    return res;
};
/**
中心扩展法  我们枚举所有的「回文中心」并尝试「扩展」，直到无法扩展为止，此时的回文串长度即为此「回文中心」下的最长回文串长度。我们对所有的长度求出最大值，即可得到最终的答案。

*/


//编写一个函数来查找字符串数组中的最长公共前缀。

var longestCommonPrefix = function(strs) {
   strs.sort((a,b) => {return a.length - b.length}) ; // 按字符串长度由小到大排序
    let smallstr = strs[0]; //最短的字符串
    let sub = ''
    let flag
    let i;
    if(strs.length === 0) {
        return sub;
    }
    if(strs.length === 1) {
        return strs[0];
    }
    for( i = 1;i<=smallstr.length;i++) {
        console.log(strs,smallstr.substr(0, i));
            flag = strs.every(item => item.startsWith(smallstr.substr(0, i)))
            if(flag) {
                sub = smallstr.substr(0, i)
                console.log(sub)
            }
            if(!flag) {
                break;
            }
    }
    return sub;
};

//字符串相乘 给定两个以字符串形式表示的非负整数 num1 和 num2，返回 num1 和 num2 的乘积，它们的乘积也表示为字符串形式。

//num1 和 num2 的长度小于110。 num1 和 num2 只包含数字 0-9。 num1 和 num2 均不以零开头，除非是数字 0 本身。不能使用任何标准库的大数类型（比如 BigInteger）或直接将输入转换为整数来处理。
var multiply = function(num1, num2) {
    num1=num1.replace(/^0*/, '')
    num2=num2.replace(/^0*/, '')
    let res = new Array(num1.length+num2.length).fill(0)
    if(num1.length === 0 || num2.length === 0) {
        return '0';
    }else {
        let fri = [...num1].map(item => {return item-'0';}), sec = [...num2].map(item => {return item-'0';})
        console.log(fri,sec)
        let smallArr = num1.length < num2.length ? fri.reverse(): sec.reverse()
        let largeArr = num1.length >= num2.length ? fri.reverse() : sec.reverse()
        console.log(smallArr, largeArr)
        for(let [i, val] of smallArr.entries()) {
            for(let [j, val2] of largeArr.entries()) {
                res[i+j]+=val*val2
                if(res[i+j]>=10) {
                    res[i+j+1]+= parseInt(res[i+j]/10)
                    res[i+j] = res[i+j]%10
                }
            }
            console.log(res)
        }
        return res.reverse().join('').replace(/^0*/, '')
    }
};

//最后一个单词的长度
//给定一个仅包含大小写字母和空格 ' ' 的字符串 s，返回其最后一个单词的长度。如果字符串从左向右滚动显示，那么最后一个单词就是最后出现的单词。

//如果不存在最后一个单词，请返回 0 。 一个单词是指仅由字母组成、不包含任何空格字符的 最大子字符串。
var lengthOfLastWord = function(s) {
    let arr = s.trim().split(/\s+/)
    if(arr.length <=1) {
        return arr.length === 0? 0: arr[0].length
    }
    return arr[arr.length-1].length
};

////交错字符串 动态规划
//给定三个字符串 s1、s2、s3，请你帮忙验证 s3 是否是由 s1 和 s2 交错 组成的。
//flagarr[i][j]表示s1前i个和s2前j个能否交错组成s3前i+j个
var isInterleave = function(s1, s2, s3) {
    let n = s1.length, m=s2.length, t =s3.length
    if(n+m!==t) {
        return false;
    }
     let flagarr = Array.from(new Array(n+1), () => (new Array(m+1).fill(false)))
     flagarr[0][0] = true
     for(let i=0;i<=n;i++) {
         for(let j=0;j<=m;j++) {
             let p = i+j-1;
             if(i>0) {
                 flagarr[i][j] = flagarr[i][j]||(flagarr[i-1][j] && s1[i-1]===s3[p]) // s1前i-1和s2前j个可以组成s3前i+j-1 且s1第i个和s3第i+j个相等
             }
             if(j>0) {
                 flagarr[i][j] = flagarr[i][j]||(flagarr[i][j-1] && s2[j-1]===s3[p])
             }
         }
     }
     console.log(flagarr)
     return flagarr[n][m]
};

//交叉字符串优化 
//使用滚动数组，优化空间复杂度 因为这里数组 f 的第 ii 行只和第 i−1 行相关，所以我们可以用滚动数组优化这个动态规划，这样空间复杂度可以变成 O(m)

var isInterleave = function(s1, s2, s3) {
    let n = s1.length, m=s2.length, t =s3.length
    if(n+m!==t) {
        return false;
    }
     let f =new Array(m+1).fill(false)
     f[0] = true
     for(let i=0;i<=n;i++) {
         for(let j=0;j<=m;j++) {
             let p = i+j-1;
             if(i>0) {
                 f[j] = f[j]&& s1[i-1]===s3[p]// s1前i-1和s2前j个可以组成s3前i+j-1 且s1第i个和s3第i+j个相等
             }
             if(j>0) {
                 f[j] = f[i-1] && s2[j-1]===s3[p]
             }
         }
     }
     return f[m]
};
//反转字符串里的单词
var reverseWords = function(s) {
    let arr = s.trim().split(/\s+/)
    return arr.reverse().join(' ')
};

//同构字符串  给定两个字符串 s 和 t，判断它们是否是同构的。
// 如果 s 中的字符可以按某种映射关系替换得到 t ，那么这两个字符串是同构的。
// 每个出现的字符都应当映射到另一个字符，同时不改变字符的顺序。不同字符不能映射到同一个字符上，相同字符只能映射到同一个字符上，字符可以映射到自己本身。
//我们维护两张哈希表，第一张哈希表 \textit{s2t}s2t 以 ss 中字符为键，映射至 tt 的字符为值，第二张哈希表 \textit{t2s}t2s 以 tt 中字符为键，映射至 ss 的字符为值。
var isIsomorphic = function(s, t) {
    var s2t = {}, t2s = {}
    for(let i=0; i<s.length; i++) {
        let x = s[i], y = t[i]
        if((s2t[x] && s2t[x]!== y )|| (t2s[y] && t2s[y] !==x)) {
            return false       
        }
        s2t[x] = y
        t2s[y] = x
    }
    return true
};

//请从字符串中找出一个最长的不包含重复字符的子字符串，计算该最长子字符串的长度。
var lengthOfLongestSubstring = function(s) { //超时了
    if(!s) return 0
    let left =0 //左指针开始指向索引为0
    let max = 1 //最长长度
    let map = new Map()
    let arr = [...s]
    let dp = new Array(arr.length).fill(1)
    map.set(arr[0], 0)
    for(let i=1; i<arr.length; i++) {
        if(map.has(arr[i])) {
            left = map.get(arr[i])+1 //从重复的后一位开始计算
            let keys = [...map.keys()]
            let delekey = []
            console.log('bfkeys',keys)
            for(let j=0, klen=keys.length; j<klen; j++) {
                console.log('key'+i, keys[j], arr)
                if(keys[j] === arr[i]) {
                    delekey.push(keys[j])
                    break;
                }
                else delekey.push(keys[j])
            }
            delekey.map(item => map.delete(item))
            dp[i] = i+1-left
            console.log('has', arr[i], keys,left,delekey)

            map.set(arr[i], i)
            console.log(map)
        }else {
            map.set(arr[i], i)
            dp[i]+=dp[i-1]
        }
    }
    console.log(dp)
    return Math.max(...dp)
};
//我们先定义一个字符串 m ，用来存放不重复的字符串。
// 然后遍历字符串，如果 m 中没有当前字符，就加进去。
// 如果有，就用 indexOf() 找到位置，通过 slice() 把它裁剪掉。
// 裁剪前保存一次字符串长度，取最大值，就是答案。

var lengthOfLongestSubstring2 = function (s) {
    var m = ''
    var res = 0
    for (var i = 0; i < s.length; i++) {
        if (m.indexOf(s[i]) == -1) {
            m += s[i]
        } else {
            res = res < m.length ? m.length : res
            m += s[i]
            m = m.slice(m.indexOf(s[i]) + 1)
        }
    }
    res = res < m.length ? m.length : res
    return res || s.length
};


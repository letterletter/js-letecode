/***
使其能将字符串转换成整数。
首先，该函数会根据需要丢弃无用的开头空格字符，直到寻找到第一个非空格的字符为止。接下来的转化规则如下：

如果第一个非空字符为正或者负号时，则将该符号与之后面尽可能多的连续数字字符组合起来，形成一个有符号整数。
假如第一个非空字符是数字，则直接将其与之后连续的数字字符组合起来，形成一个整数。
该字符串在有效的整数部分之后也可能会存在多余的字符，那么这些字符可以被忽略，它们对函数不应该造成影响。
注意：假如该字符串中的第一个非空格字符不是一个有效整数字符、字符串为空或字符串仅包含空白字符时，则你的函数不需要进行转换，即无法进行有效转换。

在任何情况下，若函数不能进行有效的转换时，请返回 0 。
我们的环境只能存储 32 位大小的有符号整数，那么其数值范围为 [−231,  231 − 1]。如果数值超过这个范围，请返回  INT_MAX (231 − 1)

*/
var myAtoi = function(s) {
    let str2 = s.trim();
    let regex =  /^\s*[+-]?\d+/;
    let match = regex.exec(str2)
    let res
    if(!match) {
        return 0;
    }else {
        res = parseInt(match[0]);
        if(res < -1* 2**31) {
            res = -1*2**31
        }else if(res > 2**31-1) {
            res = 2**31-1
        }
    }
    return res;
};
//自动机
var myAtoi2 = function(s) {
    class Automation {
        constructor() {
            this.state = 'start'; //执行阶段，默认处于开始执行阶段
            this.sign=1;//正负号
            this.answer = 0;
            //状态和执行阶段对应表 :含义如下:[执行阶段, [空格，正负，数值，其他]]
            this.map = new Map(
            [
                ['start', ['start', 'signed', 'in_number', 'end']],
                ['signed', ['end', 'end', 'in_number', 'end']],
                ['in_number', ['end', 'end', 'in_number', 'end']],
                ['end', ['end', 'end', 'end', 'end']]
           ])
        }
        //获取状态的索引
        getIndex(char) {
            let res = 3
            char === '0' && (res = 0);
            '+-'.includes(char) && (res = 1);
            !isNan(char) && (res = 2);
            return res;
        }
        //字符转换执行函数
        get(char) {
             /*
              易错点：
              每次传入字符时，都要变更自动机的执行阶段
              */
              this.state = this.map.get(this.state)[this.getIndex(char)];
              if(this.state === 'in_number') {
                /*
                小技巧：
                在JS中，对字符串类型进行减法操作，可以将得到一个数值型（Number）的值

                易错点：
                本处需要利用括号来提高四则运算的优先级
                */
                this.answer = this.answer * 10 + (char - 0);

                /*
                易错点：
                在进行负数比较时，需要将INT_MIN变为正数
                */
                this.answer = this.sign === 1 ? Math.min(this.answer, Math.pow(2, 31) - 1) : Math.min(this.answer, -Math.pow(-2, 31));
              } else if (this.state === 'signed') {
                /*
                优化点：
                对于一个整数来说，非正即负，
                所以正负号的判断，只需要一次。
                故，可以降低其判断的优先级
                */
                this.sign = char === '+' ? 1 : -1;
              }
        }
    }
    // 生成自动机实例
  let automaton = new Automaton();

  // 遍历每个字符
  for(let char of str) {
    // 依次进行转换
    automaton.get(char);
  }

  // 返回值，整数 = 正负 * 数值
  return automaton.sign * automaton.answer;
};

//实现strStr()函数，给定一个 haystack 字符串和一个 needle 字符串，在 haystack 字符串中找出 
//needle 字符串出现的第一个位置 (从0开始)。如果不存在，则返回  -1。 needle 是空字符串时我们应当返回 0 

var strStr = function(haystack, needle) {
  let len1 = haystack.length, len2 = needle.length
  let res = -1;
  if(len2 === 0) {
    return 0;
  } else {
    for(let i=0;i<len1-len2+1; i++) {
      if(!haystack.charAt(i) === needle[0]) {
        continue;
      }else {
        if(haystack.substr(i, len2) === needle) {
          res = i;
          break;
        }
      }
    }
  }
  return res;
};



/** 
给定一个只包括 '('，')'，'{'，'}'，'['，']' 的字符串，判断字符串是否有效。
有效的括号

*/
var isValid = function(s) {
  let arr = [...s]
  let left = ['(', '{', '[']
  let right = [')', '}', ']']
  let obj = { ')': '(', '}': '{', ']': '['}
  let resarr = []
  for(let i=0;i<arr.length; i++) {
    if(left.includes(arr[i])) {
      resarr.push(arr[i])
    }else if(right.includes(arr[i])) {
      if(resarr[resarr.length-1] === obj[arr[i]]) {
        resarr.pop() //弹出
      }else {
        break;
      }
    }
  }

  return resarr.length === 0?true:false
};

/** 
给你一个字符串 s 和一个字符规律 p，请你来实现一个支持 '.' 和 '*' 的正则表达式匹配。

'.' 匹配任意单个字符
'*' 匹配零个或多个前面的那一个元素
所谓匹配，是要涵盖 整个 字符串 s的，而不是部分字符串。

*/

var isMatch = function(s, p) {
  let lens = s.length
  let lenp = p.length
  let lefts = 0
  let res = true
  let arr = [...p]
  for(let [index, c] of arr.entries()) {
    if('abcdefghijklmnopqrstuvwxyz'.includes(c)) {
      if(s.charAt(lefts) === c) {
        lefts++;
      }else {
        res = false;
      }
    }
    if(c === '.') {
      lefts++;
    }else if(c === '*') {
//       if()
    }
  }
};

//动态规划
var isMatch = function(s, p) {
  let m = s.length, n = p.length
  let arr = Array.from(new Array(m+1), () => (new Array(n+1).fill(0)));// arr[i][j]f[i][j] 表示 ss 的前 ii 个字符与 pp 中的前 jj 个字符是否能够匹配
};

//将一个给定字符串根据给定的行数，以从上往下、从左到右进行 Z 字形排列。
//行数为n，要模的数是2*n-2,值为x和n-x在同一行
var convert = function(s, numRows) {
  let n = numRows*2-2;
  let arr = new Array(numRows).fill('')
  for(let i= 0;i<s.length;i++) {
    let x = i%n;
    arr[Math.min(x, n-x)] += s[i]
  }
  return arr.join('')
};



 //给定一个只包含 '(' 和 ')' 的字符串，找出最长的包含有效括号的子串的长度。
//动态规划 dp[i] 表示以下标 ii 字符结尾的最长有效括号的长度。我们将 \textit{dp}dp 数组全部初始化为 00 。显然有效的子串一定以 \text{‘)’}‘)’ 结尾，
//因此我们可以知道以 \text{‘(’}‘(’ 结尾的子串对应的 \textit{dp}dp 值必定为 00 ，我们只需要求解 \text{‘)’}‘)’ 在 \textit{dp}dp 数组中对应位置的值。

 var longestValidParentheses = function(s) {
    let dp = new Array(s.length).fill(0)
    let res = 0
    let sarr = [...s]
    let max = 0
    for(let i =1; i<s.length; i++) {
      if(s[i] === ')') {
        if(s[i-1] === '(') {
          dp[i] = ((i-2) >=0 ? dp[i-2]:0) +2; //2加上匹配前面的i-2位置的dp[i-2] ()()
        }else if(i-dp[i-1] > 0 && s[i-dp[i-1]-1] === '(' ) {//i位置减去最长匹配长度，前面的那一位的值为(
          dp[i] = dp[i-1]+2 + ((i-dp[i-1]-2) > 0 ?dp[[i-dp[i-1]-2]] :0)  //i-dp[i-1]-1为dp[i-1]匹配之前的那一位，为'(',继续加上再往前那一位存在时的dp值
        }
      }
      max = Math.max(max, dp[i])
    }
    return max;
};
//栈的方式  始终保持栈底元素为当前已经遍历过的元素中「最后一个没有被匹配的右括号的下标」，这样的做法主要是考虑了边界条件的处理，栈里其他元素维护左括号的下标：
//对于遇到的每个 \text{‘(’}‘(’ ，我们将它的下标放入栈中
// 对于遇到的每个 \text{‘)’}‘)’ ，我们先弹出栈顶元素表示匹配了当前右括号：
// 如果栈为空，说明当前的右括号为没有被匹配的右括号，我们将其下标放入栈中来更新我们之前提到的「最后一个没有被匹配的右括号的下标」
// 如果栈不为空，当前右括号的下标减去栈顶元素即为「以该右括号为结尾的最长有效括号的长度」

 var longestValidParentheses2 = function(s) {
    let arr = []
    let res = 0
    let sarr = [...s]
    let stack = [];
    stack.push(-1);
    for(let [i,c] of sarr.entries()) {
        if(c === '(') {
          stack.push(i) //把下标放进去
        }else {//为)
          stack.pop()
          if(stack.length === 0) {
            stack.push(i)
          }else {
            max = Math.max(max, i-stack[stack.length-1])
          }

        }
    }
    return res;
};

//解码方法
var numDecodings = function(s) {

};




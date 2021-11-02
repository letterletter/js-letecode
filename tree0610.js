//96. 不同的二叉搜索树
//给你一个整数 n ，求恰由 n 个节点组成且节点值从 1 到 n 互不相同的 二叉搜索树 有多少种？返回满足题意的二叉搜索树的种数

var numTrees = function(n) {
  const G = new Array(n + 1).fill(0);
  //G(i): 长度为 i 的序列能构成的不同二叉搜索树的个数。
    G[0] = 1;
    G[1] = 1;

    for (let i = 2; i <= n; ++i) {
        for (let j = 1; j <= i; ++j) {
            G[i] += G[j - 1] * G[i - j];
        }
    }
    return G[n];
};

//不同的二叉搜索树
// 给你一个整数 n ，请你生成并返回所有由 n 个节点组成且节点值从 1 到 n 互不相同的不同 二叉搜索树 。可以按 任意顺序 返回答案。
function TreeNode(val, left, right) {
   this.val = (val===undefined ? 0 : val)
   this.left = (left===undefined ? null : left)
   this.right = (right===undefined ? null : right)
}
var generateTrees = function(n) {
  const generTrees = (start, end) => {
    let curRes = []
    if(start>end) {
      curRes.push(null)
      return curRes
    }
    for(let i =  start; i<=end; i++) {
      let leftNodeList = generTrees(start, i-1)
      let rightNodeList = generTrees(i+1, end)
      for(let leftNode of leftNodeList) {
        for(let rightNode of rightNodeList) {
          curRes.push(new TreeNode(i, leftNode, rightNode))
        }
      }
    }
    return curRes
  }
  return generTrees(1, n)
};

//108. 将有序数组转换为二叉搜索树
// 给你一个整数数组 nums ，其中元素已经按 升序 排列，请你将其转换为一棵 高度平衡 二叉搜索树。
//方法一：中序遍历，总是选择中间位置左边的数字作为根节点

var sortedArrayToBST = function(nums) {
  const helper = (nums, left, right) => {
    if(left > right) {
      return null;
    }
    let mid = (left+right) >>1
    let root = new TreeNode(nums[mid])
    root.left = helper(nums, left, mid-1)
    root.right = helper(nums, mid+1, right)
    return root
  }
  return helper(nums,0 , nums.length-1)
};

// 验证二叉搜索树
// 假设一个二叉搜索树具有如下特征：

// 节点的左子树只包含小于当前节点的数。
// 节点的右子树只包含大于当前节点的数。
// 所有左子树和右子树自身必须也是二叉搜索树。
/**
 * Definition for a binary tree node.
 * function TreeNode(val, left, right) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.left = (left===undefined ? null : left)
 *     this.right = (right===undefined ? null : right)
 * }
 */
/**
 * @param {TreeNode} root
 * @return {boolean}
 */
const helper = (root, lower, upper) => {
  if(root === null) return true;
  if(root.val <= lower || root.val > upper) {
    return false
  }
  return helper(root.left, lower, root.val) && helper(root.right, root.val, upper);
}
 var isValidBST = function(root) {
  return helper(root, -Infinity, Infinity)
};

var isValidBST2 = function(root) {
  const arr = []
  const inOrder = root => {
    if(!root) return;
    inOrder(root.left)
    arr.push(root.val)
    inOrder(root.right)
  }
  inOrder(root)
  for(let i=1, len=arr.length; i< len; i++)
  {
    if(arr[i] <= arr[i-1]) return false
  }
  return true;
}
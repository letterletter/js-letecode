/**
 * @param {number[]} nums
 * @param {number} target
 * @return {number}
 */
var findTargetSumWays = function(nums, target) {
  let count = 0;
  const dfs = (nums, index, sum, target) => {
    if(index === nums.length) {
      if(sum === target) {
        count++;
      }
    }else {
      dfs(nums, index+1, sum+nums[index], target);
      dfs(nums, index+1, sum - nums[index], target)
    }
  }
  dfs(nums, 0, 0, target)
  return count;
};

//538.把二叉搜索树转换为累加树
// 树中的节点数介于 0 和 104 之间。
// 每个节点的值介于 -104 和 104 之间。
// 树中的所有值 互不相同 。
// 给定的树为二叉搜索树
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
 * @return {TreeNode}
 */
 var convertBST = function(root) {
   let sum = 0;
   const inOrder = (root) => {
     if(root === null) return; //遍历到null节点，开始返回
     inOrder(root.right); // 先进入右子树
     sum += root.val; // 节点值累加给sum
     root.val = sum; // 累加的结果，赋给root.val
     inOrder(root.left); // 进入左子树
   }
  inOrder(root); //
  return root;
};
// 543. 二叉树的直径
// 给定一棵二叉树，你需要计算它的直径长度。一棵二叉树的直径长度是任意两个结点路径长度中的最大值。这条路径可能穿过也可能不穿过根结点。
// 首先我们知道一条路径的长度为该路径经过的节点数减一，所以求直径（即求路径长度的最大值）等效于求路径经过节点数的最大值减一。
// 假设我们知道对于该节点的左儿子向下遍历经过最多的节点数 L（即以左儿子为根的子树的深度） 和其右儿子向下遍历经过最多的节点数 R（即以右儿子为根的子树的深度），那么以该节点为起点的路径经过节点数的最大值即为 L+R+1
// 而任意一条路径均可以被看作由某个节点为起点，从其左儿子和右儿子向下遍历的路径拼接得到
// 我们记节点node 为起点的路径经过节点数的最大值为 dnode，那么二叉树的直径就是所有节点 dnode的最大值减一。
var diameterOfBinaryTree = function(root) {
  let ans = 1;
  const depth = (node) => {
    if(node === null) return 0; // 访问到空节点，返回0
    let L = depth(node.left); // 左孩子为根的子树深度
    let R = depth(node.right); // 
    ans = Math.max(ans, L + R + 1); // 计算dnode并更新ans,dnode为经过的节点数的多少
    return Math.max(L, R) + 1;
  };
  depth(root);
  return ans - 1;
};

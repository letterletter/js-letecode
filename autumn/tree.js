/**
 * Definition for a binary tree node.
 * function TreeNode(val, left, right) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.left = (left===undefined ? null : left)
 *     this.right = (right===undefined ? null : right)
 * }
 */
 function TreeNode(val, left, right) {
  this.val = (val===undefined ? 0 : val)
  this.left = (left===undefined ? null : left)
  this.right = (right===undefined ? null : right)
}
// 路径 被定义为一条从树中任意节点出发，沿父节点-子节点连接，达到任意节点的序列。同一个节点在一条路径序列中 至多出现一次 。该路径 至少包含一个 节点，且不一定经过根节点。

/**
 * @param {TreeNode} root
 * @return {number}
 */
 var maxPathSum = function(root) {


 }

// 合并二叉树
 var mergeTrees = function(root1, root2) {
  if(root1 === null || root2 === null) {
    return root1 ? root1 : root2;
  }
  let mergedNode = new TreeNode(root1.val + root2.val);
  mergedNode.left = mergeTrees(root1.left, root2.left);
  mergedNode.right = mergeTrees(root1.right, root2.right);

  return mergedNode;
};
// 数组扁平
// 递归
function flat (arr) {
  let res = []
  for(let i = 0, size = arr.length; i < size; i++) {
    if(Array.isArray(arr[i])) {
      res = res.concat(flat(arr[i]))
    }else {
      res.push(arr[i])
    }
  }
}

// 非递归 栈
function flat2 (arr) {
  let res = [];
  let stack = [];
  while(stack.length > 0) {
    let cur = stack.pop();
    if(Array.isArray(cur)) {
      stack.push(...cur);
    }else {
      res.unshift(cur)
    }
  }
  return res;
}

function flat3 (arr) {
  let res = [];
  while(true) {
    if(arr.length === 0) break;
    let cur = arr.shift();
    if(Array.isArray(cur)) {
      arr.unshift(cur)
    }else {
      res.push(cur)
    }
  }

  return res;
}


//中序遍历，栈
var inorderTraversal2 = function(root) {
  const res = [];
  const stk = [];
  while (root || stk.length) {
      while (root) {
          stk.push(root);
          root = root.left;
      }
      root = stk.pop();
      res.push(root.val);
      root = root.right;
  }
  return res;
};
 

//二叉树前序遍历 迭代 使用栈，后进先出
var preorderTraversal2 = function(root) {
  let res = []
  let stack=[]
  let node = root
  while(stack.length>0 || node) {
      while(node) {//node不为空,往下找左子树，知道为空，把最后放入stack的拿出，新节点为右子树
          res.push(node.val)
          stack.push(node)
          node=node.left
      }
      node=stack.pop()
      node=node.right
  } 
  return res
};

// 后序遍历
var postorderTraversal = function(root) {
  // 初始化数据
    const res =[];
    const stack = [];
    while (root || stack.length){
      while(root){
        stack.push(root);
        res.unshift(root.val);
        root = root.right;
      }
      root = stack.pop();
      root = root.left;
    }
    return res;
};


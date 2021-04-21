//给定两个二叉树，编写一个函数来检验它们是否相同。
var isSameTree = function(p, q) {
    if(p === null && q === null) {
        return true;//两个都为空是true
    }else if(p === null || q===null) { //有一个为空
        return false;
    }else if(p.val !== q.val) {//不为空，值不相等
        return false;
    }else {//值相等，判断子树
        return isSameTree(p.left, q.left)&&isSameTree(p.right, q.right)
    }
};

//对称二叉树 迭代法

function check(p ,q) {
    if( !p && !q) { //都为kong
        return true
    }else if(!p||!q) {//一个为空
        return false
    } else {
        return p.val === q.val && check(p.left, q.right) && check(p.right, q.left)
    }
}
var isSymmetric = function(root) {
    if(!root) {
        return true;
    }
    return check(root.left,root.right)
};

//对称二叉树  迭代
// 利用栈来记录比较的过程，实际上，递归就使用了调用栈，所以这里我们可以使用栈来模拟递归的过程

// 首先根的左右子树入栈
// 将左右子树出栈，比较两个数是否互为镜像
// 如果左右子树的根节点值相等，则将左子树的 left 、右子树的 right 、左子树的 right 、右子树的 left 依次入栈
// 继续出栈（一次出栈两个进行比较）…….
// 依次循环出栈入栈，直到栈为空

var isSymmetric = function(root) {
    if(!root) return true
    let stack = [root.left, root.right]
    while(stack.length) {
        let right = stack.pop()
        let left = stack.pop()
        if(left && right) {
            if(left.val !== right.val) return false
            stack.push(left.left)
            stack.push(right.right)
            stack.push(left.right)
            stack.push(right.left)
        } else if(left || right) {
            return false
        }
    }
    return true
};

//二叉树镜像，递归
function Mirror(root)
{
    // write code here
    if(root === null) return root
    const dfs = (root) => {
        if(!root) return;
        let temp = root.left
        root.left = dfs(root.right)
        root.right = dfs(temp)
        return root;
    }
    dfs(root)
}

var mirrorTree = function(root) {
    if (root) {
        let stack = [];
        stack.push(root);
        while (stack.length > 0) {
            let node = stack.pop();
            let temp = node.left;
            node.left = node.right;
            node.right = temp;
            if (node.left) {
                stack.push(node.left);
            }
            if (node.right) {
                stack.push(node.right);
            }
        }
    }
    return root;
};
//二叉树中序遍历 ,返回中序遍 递归
/** 
 * @param {TreeNode} root
 * @return {number[]}
 */  
var inorderTraversal = function(root) {
    const res = []
    let inorder = item => {
        if(!item) {//为空
            return
        }
        inorder(item.left)
        res.push(item.val)
        inorder(item.right)
    }
    inorder(root)
    return res;
};
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



//二叉树后序遍历
var postorderTraversal = function(root) {
    const res = []
    let postorder = item => {
        if(!item) return;
        postorder(item.left)
        postorder(item.right)
        res.push(item.val)
    }
    postorder(root)
    return res
};

var postorderTraversal2 = function(root) {
    const res = []
    const stk = []
    
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
//二叉树深度
//方法1 递归
var maxDepth = function(root) {
    if(!root) {
        return 0;
    }
    let leftmax = maxDepth(root.left)
    let rightmax=maxDepth(root.right)
    return 1+Math.max(leftmax, rightmax)
};
//二叉树深度 BFS 广度优先遍历
var maxDepth2 = function(root) {
    if(!root) {
        return 0;
    }
    let queue = [root], ans=0;
    while(queue.length>0) {
        let size = queue.length
        while(size>0) {
            let node = queue.shift() //出队
            node.left && queue.push(node.left)
            node.right&& queue.push(node.right)
            size--;
        }
        ans++;
    }
    return ans
};

//二叉树层序遍历
var levelOrder = function(root) {
    if(!root) {
        return [];
    }
    let queue = [root], res = [];//queue开始放根节点,res保存结果
    while(queue.length>0) {
        let len = queue.length;
        let arr = []
        while(len) {
            let node = queue.shift() //先进的先弹出
            arr.push(node.val);
            node.left && queue.push(node.left);
            node.right && queue.push(node.right);
            len--;//len减为0，当前层遍历完
        }
        res.push(arr)
    }
    return res;
};

//n叉树层序遍历
/**
 * // Definition for a Node.
 * function Node(val,children) {
 *    this.val = val;
 *    this.children = ;
 * };
 */
var levelOrder = function(root) {
    if(!root) {
        return [];
    }
    let queue = [root], res = [];//queue开始放根节点,res保存结果
    while(queue.length>0) {
        let len = queue.length;
        let arr = []
        while(len) {
            let node = queue.shift() //先进的先弹出
            arr.push(node.val);
            if(node.children) {
                for(let c of node.children) {
                    queue.push(c)
                }
            }
            len--;//len减为0，当前层遍历完children
        }
        res.push(arr)
    }
    return res;
};
//n叉树前序遍历
var preorder = function(root) {
    let array = []
    var dfs = function (node) {
        if (node === null) {
            return
        }
        array.push(node.val)
        for (let i = 0; i < node.children.length; i++) {
            dfs(node.children[i])
        }
        return
    }
    dfs(root)
    return array
};

//左叶子之和
var sumOfLeftLeaves = function(root) {
    if(!root) {
        return 0
    }
    let sum = 0
    let queue = [root]
    while(queue.length>0) {
        let size = queue.length;
        while(size>0) {
            let node = queue.shift()
            if(node.left) {
                if(!node.left.left && !node.left.right) {
                    sum+=node.left.val
                }
                console.log(node.left.val)
                queue.push(node.left)
            }
            node.right && queue.push(node.right)
            size--
        }
    }
    return sum
};
//二叉树的锯齿形层序遍历 即先从左往右，再从右往左进行下一层遍历，以此类推，层与层之间交替进行）。
var zigzagLevelOrder = function(root) {
    let queue = [root], res = [];//queue开始放根节点,res保存结果
    let isOrderLeft = true; //是否从左向右
    while(queue.length>0) {
        let len = queue.length;
        let arr = []
        let flag = curlayer%2
        //如果从左至右，我们每次将被遍历到的元素插入至双端队列的末尾。
        //如果从右至左，我们每次将被遍历到的元素插入至双端队列的头部。
        while(len) {
            let node =  queue.shift() 
            if(isOrderLeft) {
                arr.push(node.val);
            }else {
                arr.unshift(node.val)
            }
            
            node.left && queue.push(node.left);
            node.right && queue.push(node.right);
            len--;//len减为0，当前层遍历完
        }
        isOrderLeft  = !isOrderLeft
        res.push(arr)
    }
    return res;
};
//二叉树前序遍历
//递归
var preorderTraversal = function(root) {
    let res = []
    const preOrder = item => {
        if(!item) return;
        res.push(item.val)
        preOrder(item.left)
        preOrder(item.right)
    }
    preOrder(root)
    return res
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

//二叉树最小子树
//给定一个二叉树，找出其最小深度。
//最小深度是从根节点到最近叶子节点的最短路径上的节点数量。
//
var minDepth = function(root) {
    if(!root) {
        return 0;
    }
    if(root.left&& root.right) {
        return 1+Math.min(minDepth(root.left), minDepth(root.right))
    }else if(root.left) {//左存在，右不存在
        return 1+minDepth(root.left)
    }else if(root.right) {
        return 1+minDepth(root.right)
    }else {//左右子树都不存在，当前节点高度是1
        return 1
    }
};
//最小深度 BFS 当我们找到一个叶子节点时，直接返回这个叶子节点的深度。广度优先搜索的性质保证了最先搜索到的叶子节点的深度一定最小。
var minDepth2 = function(root) {
    if(!root) {
        return 0;
    }
    let queue = [root]
    let depth =1;//root本身就是一层，
    while(queue.length>0) {
        let len = queue.length
        while(len) {
            let curNode = queue.shift()
            if(curNode.left===null && curNode.right ===null) {//当前节点的左右子树都为空，返回结果
                return depth;
            }
            curNode.left && queue.push(curNode.left)
            curNode.right && queue.push(curNode.right)
            len--;
        }
        depth++;
    }
    return depth
};
//平衡二叉树
//给定一个二叉树，判断它是不是平衡二叉树，一颗平衡二叉树的定义是一个二叉树的每个节点的左右子树的高度差的绝对值不超过1

/**
 * @param {TreeNode} root
 * @return {boolean}
 */
var isBalanced = function(root) {
    let res = balance(root)
    return res>-1
};

var balance = root => {
        if(!root) {
            return 0
        }
        let leftHeight = balance(root.left)
        let rightHeight = balance(root.right)
        if( leftHeight===-1 ||rightHeight===-1||Math.abs(leftHeight-rightHeight)>1 ) { 
            return -1
        }
        return Math.max(leftHeight, rightHeight)+1
}


//路径总和
//给定一个二叉树和一个目标和，判断该树中是否存在根节点到叶子节点的路径，这条路径上所有节点值相加等于目标和
//广度有限遍历
var hasPathSum = function(root, sum) {
   if(!root) {
       return false
   }
   let queue = [[root, root.val]]
   while(queue.length>0) {
       const [node,temsum] = queue.pop()
       node.left && queue.push([node.left, temsum+node.left.val])
       node.right && queue.push([node.left, temsum+node.left.val])
       if(!node.left&&!node.right) {
           if(temsum=== sum) {
               return true
           }
       }
   }
    return false
};

var hasPathSum2 = function(root, sum) {
    let fun = (root, sum) => {
        if (!root) return false;
        sum -= root.val;
        if (sum === 0 && !root.left && !root.right) {
            return true;
        } else {
            return fun(root.left, sum) || fun(root.right, sum);
        }
    }
    return root ? fun(root, sum) : false;
};
// 从前序与中序遍历序列构造二叉树
/**
 * Definition for a binary tree node.
 * function TreeNode(val) {
 *     this.val = val;
 *     this.left = this.right = null;
 * }
 */
/**
 * @param {number[]} preorder
 * @param {number[]} inorder
 * @return {TreeNode}
 */
var buildTree = function(preorder, inorder) {
    if(inorder.length === 0) {
        return null;
    }
    const root = new TreeNode(preorder[0])
    const mid = inorder.indexOf(preOrder[0])
    root.left = buildTree(preOrder.slice(1, mid+1), inorder.slice(0,mid))
    root.right = buildTree(preOrder.slice(mid+1), inorder.slice(mid+1))
    return root
};
//从前序与中序遍历序列构造二叉树 优化
var buildTree = function(preorder, inorder) {
    if(inorder.length === 0) {
        return null;
    }
    let map = new Map() //map存放节点在中序遍历中的位置
    for(let i=0;i<inorder.length; i++) {
        map.set(inorder[i], i)
    }
    const helper = (p_start, p_end, i_start, i_end) => {
        if (p_start > p_end) return null;
        let rootVal = preorder[p_start];    // 根节点的值
        let root = new TreeNode(rootVal);   // 根节点
        let mid = map.get(rootVal);         // 根节点在inorder的位置
        let leftNum = mid - i_start;        // 左子树的节点数
        root.left = helper(p_start + 1, p_start + leftNum, i_start, mid - 1);
        root.right = helper(p_start + leftNum + 1, p_end, mid + 1, i_end);
        return root;
    }
     return helper(0, preorder.length - 1, 0, inorder.length - 1);
};

//从中序与后续遍历构造二叉树
var buildTreeIP = function(inorder, postorder) {
    if(inorder.length === 0) {
        return null;
    }
    const helper = (in_left, in_right) => {//表示当前递归到中序序列中当前子树的左右边界.递归入口为help(0, n-1)
        if(in_left>in_right) {//子树为空，返回空节点
            return null; 
        }
        let root_val = postorder[post_index]
        const root = new TreeNode(root_val)

        //根据root位置分成两颗子树
        const index = map.get(root_val)
        post_index--; //下标减1
        root.right = helper(index+1, in_right)
        root.left = helper(in_left, index-1)
        return root
    }
    let map = new Map() //map存放节点在中序遍历中的位置
    let post_index = postorder.length-1; //作为当前子树的根节点
    for(let i=0;i<inorder.length; i++) {
        map.set(inorder[i], i)
    }
    return helper(0, inorder.length-1)
};
//计算从根节点到子节点的数字之和,比如根到子路径 1->2表示 12
//方法1 深度优先搜索
const dfs = (root, prevSum) => {
    if(root === null) {
        return 0;
    }
    const sum = prevSum*10 +root.val
    if(!root.left && !root.right) {
        return sum
    }else {
        return dfs(root.left, sum)+dfs(root.right,sum)
    }
}
var sumNumbers = function(root) {
    return dfs(root, 0)
};
//方法2广度优先遍历
var sumNumbersBFS= function(root) {
    if(!root) return 0
    let sum = 0
    let queue = []
    queue.push([root, root.val])
    while(queue.length>0) {
        const [node, num] = queue.shift()
        let left =node.left, right=node.right
        if(left === null && right === null) {
            sum+=num
        }else if(left) {
            queue.push([left, num*10+left.val])
        }else if(right) {
            queue.push([right, num*10+right.val])
        }   
    }
     return sum
};

//二叉树所有路径
//深度优先遍历
var binaryTreePaths = function(root) {
    const paths = []
    const construct_paths = (root, path) => {
        if(root) {
            path+=root.val.toString()
            if(root.left === null && root.right === null) {
                paths.push(path)
            }else {
                path+='->'
                construct_paths(root.left, path)
                construct_paths(root.right, path)
            }
        }
    }
    construct_paths(root, '')
    return paths
};
//二叉树所有路径，BFS
var binaryTreePathsBFS = function(root) {
    const paths = []
    if(root === null) return paths
    const node_queue = [root]
    const path_queue = [root.val.toString()]
    while(node_queue.length>0) {
        const node = node_queue.shift()
        const path = path_queue.shift()
        if(!node.left && !node.right) {
            paths.push(path)
        }else {
            if(node.left) {
                node_queue.push(node.left);
                path_queue.push(path + "->" + node.left.val.toString());
            }
            if(node.right) {
                node_queue.push(node.right);
                path_queue.push(path + "->" + node.right.val.toString());
            }
        }
    }
    return paths
};
//二叉树层序遍历II 给定一个二叉树，返回其节点值自底向上的层次遍历。 （即按从叶子节点所在层到根节点所在的层，逐层从左向右遍历）
var levelOrderBottom = function(root) {
    if(root === null) {
        return []
    }
    let queue = [root], res = []
    while(queue.length) {
        let len = queue.length
        let arr = []
        while(len) {
            let node = queue.shift()
            node.left && queue.push(node.left)
            node.right && queue.push(node.right)
            arr.push(node.val)
            len--
        }
        res.unshift(arr)
    }
    return res;
};

//路径总和II 给定一个二叉树和一个目标和，找到所有从根节点到叶子节点路径总和等于给定目标和的路径。
//DFS
var pathSumII = function(root, sum) {
    const paths = []
    const construct_paths = (root, path, sum) => {
        if(root) {
            path.push(root.val)
            sum-=root.val
            if(root.left === null && root.right === null && sum === 0) {
                paths.push(path.slice())
            }else {
                construct_paths(root.left, path, sum)
                construct_paths(root.right, path, sum)
            }

            path.pop()//回溯
        }
    }
    construct_paths(root, [], sum)
    return paths
}
function TreeNode(val) {
    this.val = val;
    this.left = this.right = null
}
const root = {
  val: 5,
  left: {
    val: 4,
    left: {
      val: 11,
      left: { val: 7, left: null, right: null },
      right: { val: 2, left: null, right: null },
    },
    right: null,
  },
  right: {
    val: 8,
    left: { val: 13, left: null, right: null },
    right: {
      val: 4,
      left: { val: 5, left: null, right: null },
      right: { val: 1, left: null, right: null },
    },
  },
};

//路径综合II BFS
var pathSumIIBFS = function(root, sum) {
    const paths = []
    let queue = [root]
    let queue_sum = [root.val]
    let path_queue =[[root.val]]
    while(queue.length) {
        let len = queue.length
        while(len) {
            let curNode = queue.shift()
            let cursum = queue_sum.shift()
            let curPath = path_queue.shift()
            console.log('curNode',curNode.val)
            if(curNode.left===null && curNode.right ===null && cursum === sum) {//当前节点的左右子树都为空，返回结果
                paths.push([...curPath])
            }
            if(curNode.left) {
                queue.push(curNode.left)
                queue_sum.push(cursum+curNode.left.val)
                path_queue.push([...curPath, curNode.left.val])
            }
            if(curNode.right) {
                queue.push(curNode.right)
                queue_sum.push(cursum+curNode.right.val)
                path_queue.push([...curPath, curNode.right.val])
            }
            
            len--;
        }

    }
    return paths
}

//二叉树右视图
var rightSideView = function(root) {
    let res = []
    let stack= [root]
    while(stack.legth>0) {
        let size = stack.length
        res.push(stack[size-1].val)
        let flag = 1
        while(size>0) {
            let node = stack.shift()
            node.left && stack.push(node.left)
            node.right && stack.push(node.right)
            size--
        }
    }
    return res
};
// 面试题 04.01. 节点间通路
// 节点间通路。给定有向图，设计一个算法，找出两个节点之间是否存在一条路径。
// 图中可能存在子环和平行边
var findWhetherExistsPath = function(n, graph, start, target) {
  const record = {};
  graph.forEach(([start, end]) => {
    if(record[start]) {
      record[start].add(end)
    }else {
      record[start] = new Set([end])
    }
  });
  console.log('record', record)
  return dfs(record, start, target)
};

function dfs(edges, start, target) {
  let list = edges[start]|| new Set(); // start可以到达的点
  if(list.has(target)) { // target在start可以访问到的节点列表里
    return true;
  }else {
    for(let curnode of list) {
      if(dfs(edges, curnode, target)) {
        return true;
      }
    }
  }
  return false
}
findWhetherExistsPath(3, [[0, 1], [0, 2], [1, 2], [1, 2]], 0, 2)
// findWhetherExistsPath(12, [[0, 1], [1, 2], [1, 3], [1, 10], [1, 11], [1, 4], [2, 4], [2, 6], [2, 9], [2, 10], [2, 4], [2, 5], [2, 10], [3, 7], [3, 7], [4, 5], [4, 11], [4, 11], [4, 10], [5, 7], [5, 10], [6, 8], [7, 11], [8, 10]],2,3  )


// 给你一个有 n 个节点的 有向无环图（DAG），请你找出所有从节点 0 到节点 n-1 的路径并输出
// （不要求按特定顺序）
// 二维数组的第 i 个数组中的单元都表示有向图中 i 号节点所能到达的下一些节点，空就是没有下一个结点了

/**
 * @param {number[][]} graph
 * @return {number[][]}
 */
var allPathsSourceTarget = function(graph) {
  const stack = [], ans = []
  const dfs = (graph, x, n) => {
    if(x === n) { // 遍历到第N个
      ans.push(stack.slice());
      return;
    }
    for(const y of graph[x]) { // 所有x
      stack.push(y)
      dfs(graph, y, n)
      stack.pop()
    }
  }

  stack.push(0);
  dfs(graph, 0, graph.length - 1);
  return ans;
};
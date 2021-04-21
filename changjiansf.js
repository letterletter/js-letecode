//1 冒泡排序
var  swap = function(arr, i, j) {
  let temp = arr[i]
  arr[i] = arr[j]
  arr[j] = temp
}
var  bubbleSort = function(arr) {
  // i从0到arr.length-2
  for(let i = 0; i< arr.length-1; i++) {
      let flag = true  //优化
      // j从arr.length-1到 i+1
      for(let j = arr.length-1; j>i ;j--) {
          if(arr[j] < arr[j-1]) {
              swap(arr, j-1, j)
              flag = false //优化， flag = false表明进行交换
          }
      }
      if(flag) {
          console.log('i', i,)
          break
      };  //如果当前循环没有进行交换，则
  }
  return arr
}
//冒泡优化  当在第i次遍历中没有进行数据交换， 说明arr中i之后的数字已经是从小到大排列，数组已经排序完成，可以推出循环



//2 简单选择排序 选出 i 到 arr.length -1 之间的最小的数据，记录下标min，并和 i 处的数据进行交换
var selectSort = function(arr) {
  for(let i=0; i<arr.length; i++) {
      let min = i ;//设i为最小值下标
      for(let j = i+1; j<arr.length; j++) {
          if(arr[j] <arr[min]) {  //j位置小于min位置，最小为j位置
              min = j
          }
      }
      if(min !== i) { //min不是当前i，交换
          swap(arr,i, min)
      }
  }
}
//3.直接插入排序  将左侧序列看成一个有序序列，每次将一个数字插入该有序序列。
function insertSort(arr) {

}
function insertSort(arr) {
for(let i=1; i<arr.length; i++) {
  // 遍历数组，找到比前面值小的值的下标
  if(arr[i] < arr[i-1]) {
    let temp = arr[i]; // 将arr[i]的值暂存，arr[i]处的值在下面的计算过程中会被覆盖
    // 向前遍历数组，如果前面的值比temp小，那么则把值向后移
    for(j=i-1; j>=0&&arr[j]>temp; j--) {
      arr[j+1] = arr[j]
    }
    // 此时 j 是比 temp 小的，应该把temp放在 j+1 处
    arr[j+1] = temp;
  }
}
}


//堆
function maxHeapify(A, size,  i) {
let l = 2*i+1, r = 2*i+2,largest = i
if(l<size) {
  largest = A[l] >A[i] ? l:largest
}
if(r < size&& A[r] >A[largest]) {
  largest = r
}
if(largest!== i) {
  swap(A, i, largest)
  maxHeapify(A, size, largest)
}

}

function swap(arr, i, j) {
let tem = arr[i]
arr[i] = arr[j]
arr[j] = tem
}
function buildMaxHeap(A) {
let len = A.length
for(let i = Math.floor(len/2-1); i>=0; i--) {
  maxHeapify(A, len, i)
}
return A
}

function HeapSort(A) {
buildMaxHeap(A)
let res = []
for(let i= A.length-1; i>0; i--) {
  [A[i], A[0]] = [A[0], A[i]] //将堆顶置换到i位置
  maxHeapify(A, i,0) //当前长度设为i，i后面的是有序的
}
return A
}





function MergeSort(A, p, r) {
if(p< r) {
  let q = (p+r) >> 1
  MergeSort(A, p, q)
  MergeSort(A, q+1, r)
  Merge(A,p, q,r)
  return A
}
}

function Merge(A, p, q, r) {
let n1 = q+1-p;
let n2 = r-q; //(r+1)-(q+1)
let arr1 = A.slice(p, q+1)
let arr2 = A.slice(q+1, r+1)
console.log('a1 a2' , arr1.arr2)
arr1.push(Infinity)
arr2.push(Infinity)
let res = []
let i=0, j=0
let min = Math.min(n1, n2)
let index = 0;
for(let k=p ;k<=r; k++) {
  if(arr1[i] <= arr2[j]) {
    A[k] = arr1[i]
    i++;
  }else {
    A[k] = arr2[j]
    j++;
  }
}
//   console.log(A)

}


function heapSort(arr) {
  // 构建大顶堆，从下到上，从右到左，将每个非叶子结点当作根结点，将其和子树调整成大顶堆
  for(let i=Math.floor(arr.length/2)-1; i>=0; i--) {
    heapAdjust(arr, i, arr.length-1);
  }

  for(let i=arr.length-1; i>0; i--) {
    // 将堆顶记录和当前未经排序子序列的最后一个记录交换
    swap(arr, 0, i);
     // 将 arr[1..i-1] 重新调整为大顶堆
    heapAdjust(arr, 0, i-1);
  }
}

// 已知arr[start...end]中，除了 arr[start]之外均满足堆的定义
// 堆调整函数调整 arr[start]，使arr[start...end]成为一个大顶堆
function heapAdjust(arr, start, end) {
  let temp = arr[start]; // 堆顶的值会被覆盖，所以要把这个值先记下
  // 从左孩子结点开始往下进行调整
  for(let i=start*2+1; i<=end; i=i*2+1) {
    if(i<end && arr[i]<arr[i+1]) {
      i++; // j为左右孩子关键字中较大的记录的下标
    }
    // 原始堆顶的值比两个孩子都大，则退出循环，此时的start 是这个数应该放置的下标
    if(temp>=arr[i]) {
      break;
    }
    // 最大值放在arr[start]堆顶（调整过程中，是临时的，动态的）
    arr[start] = arr[i];
    start = i;  // 临时堆顶的下标
  }
  arr[start] = temp;   // temp找到了合适的位置
}

function swap(arr, i, j) {
  let temp = arr[i];
  arr[i] = arr[j];
  arr[j] = temp;
}
##  基础排序算法

### 1.冒泡排序
*冒泡排序是一种交换排序，基本思想是：两两比较相邻记录的关键字，如果反序则交换，直到没有反序的记录为止。*
```js
function swap(arr, i, j) {
  let temp = arr[i];
  arr[i] = arr[j];
  arr[j] = temp;
}
function bubbleSort(arr) {
  // i 从 0 到 arr.length-2
  for (let i = 0; i < arr.length - 1; i++) {
    let flag = true;
    // j 从 arr.length-1 到 i+1
    for (let j = arr.length - 1; j > i; j--) {
      if (arr[j] < arr[j-1]) {
        swap(arr, j-1, j);
        flag = false;
      }
    }
    if (flag) {
      break;
    }
  }
}
let arr = [9, 1, 5, 8, 3, 7, 4, 6, 2];
bubbleSort(arr);
console.log(arr);
```
优化
*当在第 i 次遍历时，如果在这个遍历中没有进行数据交换，那么说明 arr 中 i  索引之后的数字就时从小到大排列的，因此数组排序已完成，此时可以直接退出循环。*
```js
function bubbleSort(arr) {
  // i 从 0 到 arr.length-2
  for (let i = 0; i < arr.length - 1; i++) {
    let flag = true;
    // j 从 arr.length-1 到 i+1
    for (let j = arr.length - 1; j > i; j--) {
      if (arr[j] < arr[j-1]) {
        swap(arr, j-1, j);
        flag = false;
      }
    }
    if (flag) {
      break;
    }
  }
}
let arr = [9, 1, 5, 8, 3, 7, 4, 6, 2];
bubbleSort(arr);
console.log(arr);
```
### 2.选择排序
*每次循环选取一个最小的数字放到前面的有序序列中。*
```js
function selectSort(arr) {
  for(let i = 0; i < arr.length; i++ ) {
    let min = i;      // 设 i 为最小值的下标
    for(let j = i+1; j < arr.length; j++) {
      if(arr[j] < arr[min]) {  // 如果小于 arr[min], j 赋值给 min
        min = j;      
      }
    }
    if(min != i) {
      swap(arr, i, min);
    }
  }
}
```
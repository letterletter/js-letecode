//数据流中的中位数
//中位数是有序列表中间的数。如果列表长度是偶数，中位数则是中间两个数的平均值。
var MedianFinder = function() {
  this.list = []
  this.medium = null
};

/** 
 * @param {number} num
 * @return {void}
 */
MedianFinder.prototype.addNum = function(num) {
  let len = this.list.length
  if(this.list.length === 0 || num>= this.list[len-1]) {
    this.list.push(num)
  }else {
    for(var i=len-1; i>=0; i--) {
      if(this.list[i] >= num) {
        this.list[i+1] = this.list[i]
      }else {
        this.list[i+1] = num
        break;
      }
    }
    if(i === -1) {
      this.list[0] = num
    }
  }
  return null;
};

/**
 * @return {number}
 */
MedianFinder.prototype.findMedian = function() {
  console.log(this.list)
  let len = this.list.length
  if(len = 0) {
    return null
  }
  else {
    let len = this.list.length
    if(len %2 ===1) {
      return this.list[Math.floor(len/2)]
    }else {
      return (this.list[len/2-1]+this.list[len/2])/2
    }
  }
};
// 合并k个升序链表
function mergeKLists( lists ) {
  // write code here
  return merge(lists, 0, lists.length-1)
}
function merge(lists, l , r) {
  if(l === r) {
      return lists[l]
  }
  if(l>r) return null
  let mid = (l+r) >>1
  return mergeTwoLists(merge(lists, l, mid), merge(lists, mid+1, r))
}
function mergeTwoLists(l1, l2) { //合并链表
  let phead = new ListNode(-1);
  let prev = phead
  while(l1&&l2) {
      if(l1.val<l2.val) {
          prev.next = l1
          l1=l1.next
      }else {
          prev.next = l2
          l2=l2.next
      }
      prev = prev.next
  }
  prev.next = l1?l1:l2
  return phead.next
  
}
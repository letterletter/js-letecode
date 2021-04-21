//两两交换链表中的节点 迭代
var swapPairs = function(head) {
    let dummyNode = new ListNode(0)
    dummyNode.next = head
    let temp = dummyNode
    while(temp.next && temp.next.next) {
        let node1 = temp.next
        let node2 = temp.next.next
        temp.next = node2
        node1.next = node2.next;
        node2.next = node1
        temp = node1;//
    }
    return dummyNode.next
};
//递归
var swapPairs2 = function(head) {
    if (head === null|| head.next === null) {
        return head;
    }
    const newHead = head.next;
    head.next = swapPairs(newHead.next);
    newHead.next = head;
    return newHead;
};

/*合并两个有序链表*/
//递归法
var mergeTwoLists = function(l1, l2) {
    if(l1 === null) {
      return l2;
    }
    if(l2 === null) {
      return l1;
    }else if(l1.val<l2.val) {
      l1.next = mergeTwoLists(l1.next, l2)
      return l1;
    }else {
      l2.next = mergeTwoLists(l1, l2.next)
      return l2;
    }
};

//迭代法
var mergeTwoLists = function(l1, l2) {
    const prehead = new ListNode(-1);

    let prev = prehead;
    while (l1 != null && l2 != null) {
        if (l1.val <= l2.val) {
            prev.next = l1;
            l1 = l1.next;
        } else {
            prev.next = l2;
            l2 = l2.next;
        }
        prev = prev.next;
    }

    // 合并后 l1 和 l2 最多只有一个还未被合并完，我们直接将链表末尾指向未合并完的链表即可
    prev.next = l1 === null ? l2 : l1;

    return prehead.next;
};


//删除链表的倒数第N个节点
//给定一个链表，删除链表的倒数第 n 个节点，并且返回链表的头结点
/**
 * Definition for singly-linked list.
 * function ListNode(val, next) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.next = (next===undefined ? null : next)
 * }
 */
var removeNthFromEnd = function(head, n) {
    let dummy = new ListNode(-1)
    dummy.next = head
    let length = getLength(head)
    let cur = dummy
    for(let i=1;i<length-n+1; i++) {
        cur= cur.next
    }
    cur.next = cur.next.next
    let ans = dummy.next
    return ans
};

var getLength = function(head) {
    let length= 0;
    while(head!== null) {
        ++length;
        head = head.next
    }
    return length
}

//旋转链表
//给定一个链表，旋转链表，将链表每个节点向右移动 k 个位置，其中 k 是非负数。
//将链表变成环，再进行旋转
var rotateRight = function(head, k) {
    if(head === null) {
        return null
    }
    let tem = head
    let len = 1
    while(tem.next !== null) {
        tem = tem.next
        len++
    }
    tem.next= head //构成环
    let c_list = head //头结点
    let prev = tem //设置尾结点
    for(let i=1;i<=len-k%len; i++) {
        c_list = c_list.next
        prev = prev.next
    }
    prev.next=null //断开环
    return c_list
};

//反转链表 反转一个单链表。
//方法一：迭代 在遍历列表时，将当前节点的 \textit{next}next 指针改为指向前一个元素。由于节点没有引用其上一个节点，
//因此必须事先存储其前一个元素。在更改引用之前，还需要另一个指针来存储下一个节点。不要忘记在最后返回新的头引用！
var reverseList = function(head) {
    let prev = null
    let cur = head
    while(cur!== null) {
        let tem = cur.next //当前节点的下一个赋给tem
        cur.next = prev  //当前节点的下一个改为前一个
        prev=cur //prev改为当前
        cur = tem //当前指针右移
    }
    return prev
};
//方法2 放入数组，再重组
var reverseList = function(head) {
    if(!head||!head.next) 
        return head
    let arr = []
    while(head) {
        arr.push(head.val)
        head = head.next
    }
    return arr.reduce((acc,v) => { return {val:v, next: acc}}, null)
};
//反转链表
// 反转从位置 m 到 n 的链表。请使用一趟扫描完成反转。 1 ≤ m ≤ n ≤ 链表长度。
var reverseBetween = function(head, m, n) {
    if(!head||!head.next) 
        return head
    let arr = []
    while(head) {
        arr.push(head.val)
        head = head.next
    }
    
};

//删除中间节点
//实现一种算法，删除单向链表中间的某个节点（即不是第一个或最后一个节点），假定你只能访问该节点。
var deleteNode = function(node) { //node就是要删除的节点
    node.val = node.next.val
    node.next = node.next.next
};
//分割链表
// 编写程序以 x 为基准分割链表，使得所有小于 x 的节点排在大于或等于 x 的节点之前。如果链表中包含 x，x 只需出现在小于 x 的元素之后(如下所示)。分割元素 x 只需处于“右半部分”即可，其不需要被置于左右两部分之间。
// 输入: head = 3->5->8->5->10->2->1, x = 5
// 输出: 3->1->2->10->5->5->8
var partition = function(head, x) {
    if(!head) {
        return head
    }
    let point = new ListNode(head.val)
    let pointIdx = new ListNode(-1)
    pointIdx.next = point
//     point.next = pointIdx
    let prev
    while(head.next) {
        prev=head
        head = head.next
        if(head.val<x) {
            let tem = pointIdx.next
            pointIdx.next = head
            pointIdx.next.next = tem
            head.next= head.next.next
        }else {
            point.next = head
            point=point.next
        }
    }
    return pointIdx.next
};
//分割链表，放入数组，再重组
var partition2 = function(head, x) {
    // let point = new ListNode(head.val)
    if(!head) {
        return head
    }
    let arr = []
    while(head) {
        if(head.val<x) {
            arr.push(head.val)
        }
        else {
            arr.unshift(head.val)
        }
        head=head.next
    }
    return arr.reduce((acc,v) => { return {val:v, next: acc}}, null)
};
//两个链表的第一个公共节点 ,
//不是节点的val相等，而是
// 我们使用两个指针 node1，node2 分别指向两个链表 headA，headB 的头结点，然后同时分别逐结点遍历，
//当 node1 到达链表 headA 的末尾时，重新定位到链表 headB 的头结点；当 node2 到达链表 headB 的末尾时，重新定位到链表 headA 的头结点。
// 这样，当它们相遇时，所指向的结点就是第一个公共结点。

var getIntersectionNode = function(headA, headB) {
    var h1=headA, h2=headB
    while(h1!== h2) {
        h1= h1===null ? headB:h1.next
        h2= h2===null ? headA:h2.next
    }
    return h1
};
//返回倒数第k个节点，返回该节点的值
//解法：双指针，初始是，两个指针指向Head,然后第二个指针向后移动k次，知道p,q距离为k，然后同时移动p,q，直到q指向空
var kthToLast = function(head, k) {
    let q = head//p与head之间距离为k，k为1，q是Head.next, q为null走到末尾.next，head走到末尾
    for(let i=0;i<k;i++) {
        q=q.next
    }
    while(q!==null) {
        q=q.next
        head=head.next
    }
    return head.val
};
//链表中倒数第k个节点
var getKthFromEnd = function(head, k) {
    let q = head
    for(let i=0;i<k;i++) {
        q=q.next
    }
    while(q!==null) {
        q=q.next
        head=head.next
    }
    return head
};
//删除链表的节点
//给定单向链表的头指针和一个要删除的节点的值，定义一个函数删除该节点。返回删除后的链表的头节点。题目保证链表中节点的值互不相同
var deleteNode = function(head, val) {
    let pre = head
    let point = head
    if(head.val === val) {//因为值不重复，头结点就是，就直接返回
        return head.next
    }
    while(head.next) {
        let pre = head
        head=head.next
        if(head.val === val) {
            pre.next = head.next
        }
    }
    console.log(point)
    return point
};
//从尾到头打印链表 输入一个链表的头节点，从尾到头反过来返回每个节点的值（用数组返回）。
var reversePrint = function(head) {
    var arr = []
    var order = function(node) {
        if(node === null) 
            return
        order(node.next)
        arr.push(node.val)
    }
    order(head)
    return arr
};
//二进制链表转整数
var getDecimalValue = function(head) {
    let str = ''
    while(head) {
        str+=head.val
        head=head.next
    }
    return parseInt(str,2)
};
//反转链表II 
// 给定一个链表和一个特定值 x，对链表进行分隔，使得所有小于 x 的节点都在大于或等于 x 的节点之前。
// 你应当保留两个分区中每个节点的初始相对位置。
var partition3 = function(head, x) {
    let small = new ListNode(-1)
    let large = new ListNode(-1)
    let small_dummy = small
    let large_dummy = large
    while(head) {
        if(head.val<x) {
            small.next = head
            small=small.next
        }else {
            large.next = head
            large=large.next
        }
        head=head.next
    }
    large.next=null
    small.next=large_dummy.next
    return small_dummy.next
};

//删除排序链表中的重复元素 II
//给定一个排序链表，删除所有含有重复数字的节点，只保留原始链表中 没有重复出现 的数字。
var deleteDuplicates = function(head) {
    let arr = []
    while(head) {
        let pre=head
        let cur = head.next
        if(cur===null ||cur.val !==pre.val) {//cur===null表示当前pre是最后一个节点
            arr.push(pre.val)
            head=head.next
        }else {
            while(cur!==null && cur.val === pre.val) {
            pre=cur
            head=head.next
            cur=head
            }
        }
    }
    return arr.reverse().reduce((acc,v) => { return {val:v, next: acc}}, null)
};
//链表中下一个更大的节点
var nextLargerNodes = function(head) {
//     if(!head||!head.next) {
//         return []
//     }
    let arr = [], res=[]
//     while(head) {
//         arr.push(head.val)
//         head= head.next
//     }
    arr=head
    while(arr.length >0) {
        let cur=arr[0]
        console.log('cur', cur,res)
        let find = false
        let k =1
        if(arr.length === 1) {
            res.push(0)
            arr.shift()
            find=true
        }
        while(!find) {
            if(arr[k] > cur) {
                res.push(arr[k])
                arr.shift()
                find = true
            }
            if(!find) {
                k++
                if(k === arr.length) { //没找到
                res.push(0)
                arr.shift()
                find=true
            }
            }
        }
    }
    console.log(res)
};
//链表中下一个更大的节点
var nextLargerNodes2 = function(head) {
    if(head === null ||head.next === null) {
        return head === null?[] :[0]
    }
    let arr=[],res=[], curMax = Number.MIN_SAFE_INTEGER
    while(head) {
        let pre = head.next
            
            while(pre && pre.val<=head.val) {
                pre=pre.next
            }
            if(pre) {
                res.push(pre.val)
                curMax=pre.val //当前节点后面的更大值
            } else {//走到链表尾部都没找到
                res.push(0)
                curMax = 0
            }
        head=head.next
    }
    return res
};

//环形链表  给定一个链表，判断链表中是否有环。
//方法1 遍历所有节点，每遍历到一个节点，判断该节点是否被访问过
var hasCycle = function(head) {
    let map = new Map()
    while(head) {
        if(map.has(head)) {
            return true
        }
        map.set(head, true);
        head = head.next
    }
    return false
};
//快慢指针法
//快、慢指针，从头节点出发慢指针每次走一步，快指针每次走两步，不断比较它们指向的节点的值如果节点值相同，说明有环。如果不同，继续循环。
var hasCycle2 = function(head) {
    let fast = head
    let slow = head
    while(fast) {
        if(fast.next === null) return false;
        slow = slow.next
        fast = fast.next.next;
        if(slow === fast) {
            return true
        }
    }
    return false
};

//环形链表2 给定一个链表，返回链表开始入环的第一个节点。 如果链表无环，则返回 null。
//哈希表
var detectCycle = function(head) {
    var visited = new Set()
    while(head) {
        if(visited.has(head)) {
            return head
        }
        visited.add(head);
        head = head.next
    }
    return null
};
//快慢指针
//我们使用两个指针，fast 与 slow。它们起始都位于链表的头部。随后，slow 指针每次向后移动一个位置，而 fast 指针向后移动两个位置。如果链表中存在环，则fast 指针最终将再次与slow 指针在环中相遇。
//设链表中环外部分的长度为 a。slow 指针进入环后，又走了 bb 的距离与fast 相遇。此时，fast 指针已经走完了环的 n 圈，因此它走过的总距离为 a+n(b+c)+b=a+(n+1)b+nc。
//任意时刻，fast 指针走过的距离都为 slow 指针的 2倍,  a+(n+1)b+nc = 2(a+b) => a=c+(n-1)(b+c)
//从相遇点到入环点的距离加上 n-1n−1 圈的环长，恰好等于从链表头部到入环点的距离。
var detectCycle = function(head) {
    if(head === null) return null;
    let slow = head, fast = head;
    while(fast!==null) {
        slow = slow.next
        if(fast.next !== null) {
            fast = fast.next.next
        }else {//不是环
            return null;
        }
        if(fast === slow) { //快慢指针相遇
            let ptr = head
            while(ptr!== slow) {
                ptr = ptr.next
                slow = slow.next
            }
            return ptr
        }
    }
    return null
};


// 给你两个 非空 的链表，表示两个非负的整数。它们每位数字都是按照 逆序 的方式存储的，并且每个节点只能存储 一位 数字。
// 请你将两个数相加，并以相同形式返回一个表示和的链表。
var addTwoNumbers = function(l1, l2) {
    let head = null, tail = null
    let carry = 0 //进位
    while(l1 || l2) {
        const n1 = l1? l1.val:0
        const n2 = l2? l2.val:0 
        const sum = n1+n2+carry
        if(!head) {
            head = tail = new ListNode(sum%10)
        }else {
            tail.next = new ListNode(sum%10) //创建tail.next
            tail = tail.next  //tail指向tail.next
        }
        carry = Math.floor(sum/10)
        l1 && (l1=l1.next)
        l2 && (l2=l2.next)

    }
    if(carry>0) { //l1和l2走完，还有进位carry
        tail.next = new ListNode(carry)
    }
    return head
};
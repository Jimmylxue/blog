# 《数据结构与算法 JavaScript 描述》记录

::: tip 前言
曾经的我一度认为，没必要去学习数据结构和算法，因为没用数据结构和算法，我一样可以很好的完成我的工作。但随着自己的成长，越发觉得算法和数据结构是多么的重要！
:::

::: tip 为什么推荐这本书
市面上的算法书有很多，厚的像《算法-第四版》、薄一点像是《算法图解》、《啊哈！算法》我都有买，但是读到一半都卡壳了。原因有：

- 代码不是基于 JavaScript，看其他语言的代码虽然大致看得懂，但还是有一定的成本。
- 本书会先完整的介绍了一遍数据结构，再开始搞算法，这个比较适合我。
- 本书只有 200 多页，其中前两章是介绍 JS 的一些 API，所以读起来非常的轻松。
  :::

## 列表(List)

大学时我是有上《数据结构》这门课的，但是好像没听过 **列表** 这一个数据结构。

列表是一组有序的数据。每个列表中的数据项称为元素。在 JavaScript 中，列表中的元素 可以是任意数据类型。列表中可以保存多少元素并没有事先限定，实际使用时元素的数量 受到程序内存的限制。

列表具有以下的 API:

| 属性/方法          | 含义                               |
| ------------------ | ---------------------------------- |
| listSize（属性）   | 列表的元素个数                     |
| pos（属性）        | 列表的当前位置                     |
| length（属性）     | 返回列表中元素的个数               |
| clear（方法）      | 清空列表中的所有元素               |
| toString（方法）   | 返回列表的字符串形式               |
| getElement（方法） | 返回当前位置的元素                 |
| insert（方法）     | 在现有元素后插入新元素             |
| append（方法）     | 在列表的末尾添加新元素             |
| remove（方法）     | 从列表中删除元素                   |
| front（方法）      | 将列表的当前位置设移动到第一个元素 |
| end（方法）        | 将列表的当前位置移动到最后一个元素 |
| prev（方法）       | 将当前位置后移一位                 |
| next（方法）       | 将当前位置前移一位                 |
| currPos（方法）    | 返回列表的当前位置                 |
| moveTo（方法）     | 将当前位置移动到指定位置           |

点击[查看源码](https://gitee.com/jimmyxuexue/video-code/blob/master/%E3%80%8A%E6%95%B0%E6%8D%AE%E7%BB%93%E6%9E%84%E4%B8%8E%E7%AE%97%E6%B3%95JavaScript%E6%8F%8F%E8%BF%B0%E3%80%8B/%E5%88%97%E8%A1%A8/List.ts)

**测试代码**

```js
let names = new List<String>();
names.append("jimmy");
names.append("xuexue");
names.append("Jack");
names.append("Henry");
console.log(names.getElement()); // jimmy
names.next();
console.log(names.getElement()); // xuexue
names.clear();
names.append("Henry");
names.append("jimmy");
names.append("xuexue");
names.append("Jack");
names.moveTo(3);
console.log(names.getElement()); // jack
names.front();
console.log(names.getElement()); // henry
console.log(names.length); // 4
```

已经知道了列表的数据结构了，列表是一种最自然的数据组织方式，我的体验下来之后感觉好像和数组差不多的，不过封装了几个还蛮不错的方法。

列表具有以下的特点：

- 存储数据的顺序并不重要
- 不需要对数据进行查找

如果满足以上两个情况，列表就是最适合不过的数据结构了。

## 栈(Stack)

栈和列表是一种类似的数据结构，不过从上个例子也能看出来，列表是非常简陋的，几乎就是简单的处理数组的 API 相结合了，使用场景也相对有所限制。

栈则不同，栈再计算机世界有非常多的使用场景，比如 JS 执行时上下文其实就是个栈的结构。栈是一种高效的数据结构，因为数据只能在栈顶添加或删除，所以这样的操作很快，而且容易实现。

简单概括栈：

- 先进后出、后进先出
- 元素只能通过栈顶访问

栈具有以下 API：

| 属性/方法      | 含义                     |
| -------------- | ------------------------ |
| push（方法）   | 元素入栈                 |
| pop（方法）    | 元素出栈                 |
| peek（方法）   | 返回栈顶元素（不删除它） |
| clear（方法）  | 清空栈内所有元素         |
| length（属性） | 记录栈内元素个数         |
| empty（属性）  | 判断栈是否是空           |

**实现代码**

```js
{
  class Stack<T> {
    dataStore: T[] = [];
    top: number = 0;
    constructor() {}
    // 获取栈的长度
    get length(): Number {
      return this.dataStore.length;
    }
    // 入栈方法
    push(element: T): void {
      this.dataStore.push(element);
      this.top++;
    }
    // 出栈方法
    pop(): T {
      // 数组的pop()方法就是删除数组的最后一个元素
      if (this.dataStore.length !== 0) {
        this.top--;
        // console.log("2222");
        return this.dataStore.pop();
      }
    }
    // 返回栈顶元素
    peek(): T {
      // console.log(111, this.dataStore, this.top);
      return this.dataStore[this.top - 1];
    }
    // 清空栈
    clear(): void {
      this.top = 0;
      this.dataStore.length = 0;
    }
  }
}
```

这里获取栈的长度使用了 `getter`，很多时候其实我并不知道 `getter` 和 `setter`的使用场景，但其实这个就是一个比较不错的使用场景，这里 length 是一个属性，我们当然也可以使用 `length()`方法来及逆行操作，但是就与整个语意不相符合。`length`更像是属性，如果是`getLength`才像是方法。

getter 和 setter 可以用来：

- 处理访问日志（getter）
- 类型检查（setter）

### 数制间的相互转换

可以利用栈将一个数字从一种数制转换成另一种数制。使用栈，在 JavaScript 中实现该算法就是小菜一碟。

```js
function mulBase(num,base){
    let s = new Stack()
    do{
        s.push(num%base)
        num = Math.floor(num /= base)
    }while(num>0)
    let cinverted = ''
    while(s.length>0){
        converted += s.pop()
    }
    return converted
}
var newNum = mulBase(32, 2);
console.log('32转为2进制的结果为：'newNum)
```

### 判断一个数是否是回文数

类似于 dad、racecar 这种就是回文数，A man, a plan, a canal: Panama 和 1001 也是会问，而这种结构，使用栈也能够轻松的解决。

```js
function isPalindrome(word) {
  let s = new Stack();
  for (let i = 0; i < word.length; i++) {
    s.push(word[i]);
  }
  let rword = "";
  while (s.length > 0) {
    rword += s.pop();
  }
  return word === rword;
}
console.log(isPalindrome("hello"));
console.log(isPalindrome("racecar"));
```

### 使用栈模拟递归

如 leetcode 中的爬楼梯问题、算阶乘问题，这种可以写成正常的写递归函数，也可以用栈的数据结构来实现。

如：计算阶乘

```js
// 递归函数实现
function factorial(n) {
  if (n === 0) {
    return 1; // 0的阶乘为1
  } else {
    return n * factorial(n - 1);
  }
}
// 栈实现
function fact(n) {
  let s = new Stack();
  while (n > 1) {
    s.push(n--);
  }
  let product = 1;
  while (s.length > 0) {
    product *= s.pop();
  }
  return product;
}
console.log(factorial(5)); // 显示 120
console.log(fact(5)); // 显示 120
```

## 队列(Queue)

队列是一个更加复杂的列表，其只能在队尾插入元素，在队首删除元素。队列用于存储按顺序排列的数据，先进先出。队列的场景可以理解成是在食堂排队点餐的场景，只有队首的人点完了之后的人才能点餐，新来的人只能在队尾排队等候。

栈具有以下 API：

| 属性/方法        | 含义                 |
| ---------------- | -------------------- |
| enqueue（方法）  | 队尾添加元素         |
| dequeue（方法）  | 队首删除元素         |
| front（方法）    | 读取队首元素         |
| back（方法）     | 读取队尾元素         |
| toString（方法） | 显示队列内的所有元素 |
| isEmpty（方法）  | 判断队列是否为空     |
| clear（属性）    | 清空队列             |
| length（属性）   | 获取队列长度         |

```js
{
  class Queue<T> {
    private dataStore: T[] = [];
    get length(): number {
      return this.dataStore.length;
    }
    enqueus(element: T) {
      this.dataStore.push(element);
    }
    dequeus(): T | undefined {
      return this.dataStore.shift();
    }
    front(): T {
      return this.dataStore[0];
    }
    back(): T {
      return this.dataStore[this.length - 1];
    }
    toString() {
      return this.dataStore.map((item) => item).join("\n");
    }
    clear() {
      this.dataStore.length = 0;
    }
    isEmpty() {
      return this.length === 0;
    }
  }
}
```

### 基数排序（使用队列对数据进行排序）

对于 0~99 的数据，基数排序是将数据集合扫描两次，它不是最快的排序方法，但是是一种特别有意思的使用队列的排序算法。

例如现有数字：91, 46, 85, 15, 92, 35, 31, 22。经过基数排序，第一次扫描先从个位开始排序：

```
Bin 0:
Bin 1: 91, 31
Bin 2: 92, 22
Bin 3:
Bin 4:
Bin 5: 85, 15, 35
Bin 6: 46
Bin 7:
Bin 8:
Bin 9:
```

排序结果为：91, 31, 92, 22, 85, 15, 35, 46

再使用上回的结果，根据十位上的数字再次进行一次排序：

```
Bin 0:
Bin 1: 15
Bin 2: 22
Bin 3: 31, 35
Bin 4: 46
Bin 5:
Bin 6:
Bin 7:
Bin 8: 85
Bin 9: 91, 92
```

最后再取出数据，结果为：15, 22, 31, 35, 46, 85, 91, 92，我们发现已经排号序啦~

**实现代码**

```js
let queues: Queue<Number>[] = [];
for (var i = 0; i < 10; ++i) {
  queues[i] = new Queue<Number>(); // 数组的每一项都是队列
}
let nums = [];
for (var i = 0; i < 10; ++i) {
  nums[i] = Math.floor(Math.floor(Math.random() * 101)); // 随机生成100以内10个数
}

console.log("BEFORE", nums);

const distribute = (
  nums: number[],
  queues: Queue<Number>[],
  n: number,
  digit: number
) => {
  for (let i = 0; i < n; i++) {
    if (digit == 1) {
      // 个位排序
        queues[nums[i] % 10].enqueus(nums[i]);
    } else {
      // 十位上的排序
      queues[Math.floor(nums[i] / 10)].enqueus(nums[i]);
    }
  }
};

const collect = (queuss: Queue<Number>[], nums: number[]) => {
  let i = 0;
  for (let digit = 0; digit < 10; digit++) {
    while (!queuss[digit].isEmpty()) {
      nums[i++] = queuss[digit].dequeus() as number; // 根据队列出队再次排序赋值覆盖数组
    }
  }
};
// 第一次收集 -- 按个位进行排序
distribute(nums, queues, 10, 1);
collect(queues, nums);
// 第二次收集 -- 按十位进行排序
distribute(nums, queues, 10, 10);
collect(queues, nums);
console.log(nums)
```

### 优先队列

在一般情况下，从队列中删除的元素，一定是率先入队的元素。但是也有一些使用队列的应用，在删除元素时不必遵守先进先出的约定。这种应用，需要使用一个叫做优先队列的数据结构来进行模拟。

优先队列的现场场景也有很多，比如急诊科的候诊室，一般情况下都是正常的排队,

```ts
interface Element {
  data: any;
  code: number;
}
class Queue {
  private dataStore: Element[] = [];
  get length(): number {
    return this.dataStore.length;
  }
  enqueus(element: Element) {
    this.dataStore.push(element);
  }
  dequeus(): any | undefined {
    let priority = this.dataStore[0].code;
    let flag = false;
    for (let i = 1; i < this.dataStore.length; i++) {
      if (this.dataStore[i].code < priority) {
        flag = true;
        priority = i;
      }
    }
    return flag
      ? this.dataStore.splice(priority, 1)[0]
      : this.dataStore.shift();
  }
  front(): Element {
    return this.dataStore[0];
  }
  back(): Element {
    return this.dataStore[this.length - 1];
  }
  toString(): string {
    return this.dataStore
      .map((item) => item.data + "--" + item.code)
      .join("\n");
  }
  clear(): void {
    this.dataStore.length = 0;
  }
  isEmpty(): boolean {
    return this.length === 0;
  }
}
```

以上的队列的方法几乎和普通队列基本是一样,区别在于我们需要定义队列中每个元素的数据类型,我们这里使用的 **接口** 来定义,每个元素有内容`data`和优先级`code`,每次出队会先根据队列中的优先级来进行出队.

**测试代码**

```js
let que = new Queue();
/**
 * 优先级一到5 1的最高 5最低
 */
que.enqueus({ data: "吃饭", code: 2 });
que.enqueus({ data: "睡觉", code: 2 });
que.enqueus({ data: "打豆豆", code: 2 });
que.enqueus({ data: "学习", code: 1 });
console.log(que.dequeus()); // { data: '学习', code: 1 }
console.log(que.dequeus()); // { data: '吃饭', code: 2 }
console.log(que.toString()); // 睡觉--2 \n 打豆豆--2
```

## 链表

在前面的例子中，我们所有的数据结构底层都是使用数组的完成的，诚然，数组是一个非常好用且非常易用的一个存储结构，但是数组并不总是组织数据的最佳结构。

### 数组的缺点

这是个经典的面试题，经常会问链表和数组的相比的优缺点。
在有的编程语言（C#、Java）数组的长度是固定，所以当数组长度满了以后想加入新的元素就会异常的困难，因为数组在内存中是顺序存储的，所以有时候删除和添加元素也是相对麻烦，会涉及其他元素向前或者向后移动。

### 链表的节点(Node)类型

JavaScript可以基于对象实现链表，每个节点包含两个属性，分别是：

| 属性/方法 | 含义                 |
| --------- | -------------------- |
| element   | 保存节点上的数据     |
| next      | 指向下一个节点的链接 |

```ts
class Node{
    constructor(public element: any = null, public next: Node | null = null) {}
}
```

### 链表(LinkList)类型

栈具有以下 API：

| 属性/方法 | 含义                 |
| --------- | -------------------- |
| head   | 链表的头节点 |
| find  | 查找给定的数据 |
| insert | 插入新节点 |
| remove | 删除节点         |
| display | 显示链表中的元素 |

```ts
class LinkList<T> {
  public head = new Node("head");
  find(item: T): Node {
    let currNode = this.head;
    while (currNode.next) {
      if (currNode.element === item) {
        break;
       } else {
        currNode = currNode.next;
       }
    }
    return currNode;
  }
  findPrevious(item: T): Node {
    // 查找一个元素的前一个元素
    let currNode = this.head;
    while (currNode.next) {
      if (currNode.next.element === item) {
        break;
      } else {
        currNode = currNode.next;
      }
    }
    return currNode;
  }
  insert(newElement: T, item: T): void {
    let node = new Node(newElement);
    let currNode = this.find(item);
    node.next = currNode.next;
    currNode.next = node;
  }
  remove(item: T): void {
    let prevNode = this.findPrevious(item);
    if (prevNode.next) {
      prevNode.next = prevNode.next.next;
    }
  }
  display(): void {
    let currNode = this.head;
    while (currNode) {
      console.log(currNode.element);
      if (currNode.next) {
        currNode = currNode.next;
      } else {
        break;
      }
    }
  }
}
```


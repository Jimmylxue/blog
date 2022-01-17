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

## 列表

大学时我是有上《数据结构》这门课的，但是好像没听过 **列表** 这一个数据结构。

列表是一组有序的数据。每个列表中的数据项称为元素。在 JavaScript 中，列表中的元素 可以是任意数据类型。列表中可以保存多少元素并没有事先限定，实际使用时元素的数量 受到程序内存的限制。

列表具有以下的 API:

|  属性/方法  | 含义 |
|  ----  | ----  |
| listSize（属性） | 列表的元素个数 |
| pos（属性） | 列表的当前位置 |
| length（属性） | 返回列表中元素的个数 |
| clear（方法） | 清空列表中的所有元素 |
| toString（方法） | 返回列表的字符串形式 |
| getElement（方法） | 返回当前位置的元素 |
| insert（方法） | 在现有元素后插入新元素 |
| append（方法） | 在列表的末尾添加新元素 |
| remove（方法） | 从列表中删除元素 |
| front（方法） | 将列表的当前位置设移动到第一个元素 |
| end（方法） | 将列表的当前位置移动到最后一个元素 |
| prev（方法） | 将当前位置后移一位 |
| next（方法） | 将当前位置前移一位 |
| currPos（方法） | 返回列表的当前位置 |
| moveTo（方法） | 将当前位置移动到指定位置 |

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

## 栈

栈和列表是一种类似的数据结构，不过从上个例子也能看出来，列表是非常简陋的，几乎就是简单的处理数组的API相结合了，使用场景也相对有所限制。

栈则不同，栈再计算机世界有非常多的使用场景，比如JS函数执行时其实就是个栈的结构。栈是一种高效的数据结构，因为数据只能在栈顶添加或删除，所以这样的操作很快，而且容易实现。

简单概括栈：

- 先进后出、后进先出
- 元素只能通过栈顶访问

栈具有以下API：

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

**测试代码**

````js
let user = new Stack<String>();
user.push("Jimmy");
user.push("xuexue");
user.push("Jack");
console.log("peek", user.peek());
console.log("pop", user.pop());
console.log("clear", user.clear());
console.log("peek", user.peek());
user.push("红宝书");
console.log("peek", user.peek());
````


## 下一个排列

::: tip 考点
难度：**中级**

思想：**排序**、**循环**
:::

---

:::demo

```vue
<template>
  <div class="demo">
    <iframe
      src="//player.bilibili.com/player.html?aid=465391686&bvid=BV1pL411V7me&cid=476632469&page=1"
      scrolling="no"
      border="0"
      frameborder="no"
      framespacing="0"
      allowfullscreen="true"
    >
    </iframe>
  </div>
</template>
<style>
.demo > iframe {
  width: 100%;
  height: 450px;
}
</style>
```

:::

#### 题目

实现获取 下一个排列 的函数，算法需要将给定数字序列重新排列成字典序中下一个更大的排列（即，组合出下一个更大的整数）。

如果不存在下一个更大的排列，则将数字重新排列成最小的排列（即升序排列）。

必须 **原地** 修改，**只允许使用额外常数空间**。

示例 1：

输入：nums = [1,2,3]
输出：[1,3,2]
示例 2：

输入：nums = [3,2,1]
输出：[1,2,3]
示例 3：

输入：nums = [1,1,5]
输出：[1,5,1]
示例 4：

输入：nums = [1]
输出：[1]。

#### 解题思路

首先这题有给我们一些重要的限制

- 数组只能 **原地修改**
  - 排序
  - 两两交换
- 只允许额外的 **常数空间**

**解题原型**：

![image-20220103133005660](https://vitepress-source.oss-cn-beijing.aliyuncs.com/typoraimage-20220103133005660.png)

**总结步骤有以下几步**：

- 从后往前遍历数组，当前遍历的这个值比前一个值（i - 1）大的情况
- 如果找到了停止遍历，将这个值及其以后的值进行 **升序** 排序
- 在 **升序** 的这个数组中再遍历，找到一个比 索引为(i-1)值大的数，将这两个数进行两两交换。

**细节**：

- 有关数组的操作全部都要在原数组中操作，不能生成额外的数组
- 需要写一些简单的排序算法

**其他**

文档资料请到：http://www.jimmyxuexue.top:999/

源码请到公众号：Jimmy 前端 中获取

![image-20220101163759472](https://vitepress-source.oss-cn-beijing.aliyuncs.com/typoraimage-20220101163759472.png)

## 两两交换链表中的节点

::: tip 考点
难度：**中级**

思想：**链表**
:::

---

:::demo

```vue
<template>
  <div class="demo">
    <iframe
      src="//player.bilibili.com/player.html?aid=935351395&bvid=BV18T4y127j1&cid=474874163&page=1"
      scrolling="no"
      border="0"
      frameborder="no"
      framespacing="0"
      allowfullscreen="true"
    >
    </iframe>
  </div>
</template>
<style>
.demo > iframe {
  width: 100%;
  height: 450px;
}
</style>
```

#### 题目

:::

输入：head = [1,2,3,4]
输出：[2,1,4,3]
示例 2：

输入：head = []
输出：[]
示例 3：

输入：head = [1]
输出：[1]

#### 解题思路

#### 如果是数组？是不是就很简单了？

[1,2,3,4] = > [2,1,4,3]

思路：

- 每两个两个进行一次交换

  - `index%2 === 0` 为一对交换元素中的第一个

  - `index%2 !==0` 为一堆交换元素中的第二个

  - 两两交换的基本代码（需要引入一个 temp 临时变量）

    ```js
    let a = 1,
      b = 2;
    let temp = a;
    a = b;
    b = a;
    ```

#### 链表也是一样，只是链表的数据结构有所不同

链表每个节点存储的是一个对象，分别存储着 val 值和 next 索引，next 指向的就是下一个节点

思路和数组一样，遍历链表，每两个链表作为一对交换的点，再进行亮亮交换

![image-20220101163517745](https://vitepress-source.oss-cn-beijing.aliyuncs.com/typoraimage-20220101163517745.png)

具体代码

```js
/**
 * Definition for singly-linked list.
 * function ListNode(val, next) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.next = (next===undefined ? null : next)
 * }
 */
/**
 * @param {ListNode} head
 * @return {ListNode}
 */
var swapPairs = function (head) {
  let demo = head;
  let index = 0;
  let temp = new ListNode(null);
  while (demo) {
    if (index % 2 === 0) {
      temp.val = demo.val;
      if (demo.next) {
        demo.val = demo.next.val;
      }
    } else {
      demo.val = temp.val;
    }
    index++;
    demo = demo.next;
  }
  return head;
};
```

#### 总结

使用数组的解决思路放到链表上即可，只是因为数据结构不同，代码略有不同，但是思想是一样的。

## 两数相除

::: tip 考点
难度：**中级**

思想：**递归**、**循环**
:::

---

:::demo

```vue
<template>
  <div class="demo">
    <iframe
      src="//player.bilibili.com/player.html?aid=765364749&bvid=BV1Zr4y1m74w&cid=475644754&page=1"
      scrolling="no"
      border="0"
      frameborder="no"
      framespacing="0"
      allowfullscreen="true"
    >
    </iframe>
  </div>
</template>
<style>
.demo > iframe {
  width: 100%;
  height: 450px;
}
</style>
```

:::

#### 题目

给定两个整数，被除数 dividend 和除数 divisor。将两数相除，要求不使用乘法、除法和 mod 运算符。

返回被除数 dividend 除以除数 divisor 得到的商。

整数除法的结果应当截去（truncate）其小数部分，例如：truncate(8.345) = 8 以及 truncate(-2.7335) = -2

示例 1:

输入: dividend = 10, divisor = 3
输出: 3
解释: 10/3 = truncate(3.33333..) = truncate(3) = 3
示例 2:

输入: dividend = 7, divisor = -3
输出: -2
解释: 7/-3 = truncate(-2.33333..) = -2

#### 解题思路

首先声明我的这个解题肯定不是最优解！这题比较难只能是先写出来打个标记日后再回来以更优的方式重做。

我的思路就是正常的数学思路解题，使用循环或者递归进行解题。

我们需要注意性能问题以及考虑的点：

- 当被除数为 0 时，直接 0
- 因为被除数和除数可能为负数，所以需要考虑 - - 负负得正，负正得负，正正得正
- 获取负数的个数
- 利用循环/递归的方式进行累加/累乘进行解题

## 搜索旋转排序数组

::: tip 考点
难度：**中级**
:::

---

:::demo

```vue
<template>
  <div class="demo">
    <iframe
      src="//player.bilibili.com/player.html?aid=850413721&bvid=BV1aL4y1t75Q&cid=477449479&page=1"
      scrolling="no"
      border="0"
      frameborder="no"
      framespacing="0"
      allowfullscreen="true"
    >
    </iframe>
  </div>
</template>
<style>
.demo > iframe {
  width: 100%;
  height: 450px;
}
</style>
```

:::

#### 题目

整数数组 nums 按升序排列，数组中的值 互不相同 。

在传递给函数之前，nums 在预先未知的某个下标 k（0 <= k < nums.length）上进行了 旋转，使数组变为 [nums[k], nums[k+1], ..., nums[n-1], nums[0], nums[1], ..., nums[k-1]]（下标 从 0 开始 计数）。例如， [0,1,2,4,5,6,7] 在下标 3 处经旋转后可能变为 [4,5,6,7,0,1,2] 。

给你 旋转后 的数组 nums 和一个整数 target ，如果 nums 中存在这个目标值 target ，则返回它的下标，否则返回 -1 。

示例 1：

输入：nums = [4,5,6,7,0,1,2], target = 0
输出：4
示例 2：

输入：nums = [4,5,6,7,0,1,2], target = 3
输出：-1
示例 3：

输入：nums = [1], target = 0
输出：-1

#### 解题思路

因为整个数组最对会被分成两个相对升序的数组

因为数组是升序的，所以我们在查找值时其实是有方法，在满足条件情况下就不用继续遍历了，所以总体上就是我们要规避掉不需要的操作

**解题原型**：

- 场景 1：小 => 大 => 小

  ![image-20220104192304623](https://vitepress-source.oss-cn-beijing.aliyuncs.com/typoraimage-20220104192304623.png)

- 场景 2：大 => 小

  ![image-20220104191403019](https://vitepress-source.oss-cn-beijing.aliyuncs.com/typoraimage-20220104191403019.png)

- 场景 3

  直接找到 target 指数输出即可

**总结步骤有以下几步**：

我们需要比对 目标值 和 遍历中的每个值的大小情况

- 当相等时，直接输出这个索引

- 当大小情况出现：小=>大=>小 的情况 不需要遍历 直接返回-1

- 当大小情况出现：大=>小 的情况 不需要遍历 直接返回-1

**细节**：

- 需要定义额外的变量来确定是先小后大，还是先大后小

**其他**

文档资料请到：http://www.jimmyxuexue.top:999/

源码请到公众号：Jimmy 前端 中获取

## 有效的数独

::: tip 考点
难度：**中级**

思想：**遍历**、**数据处理**
:::

---

:::demo

```vue
<template>
  <div class="demo">
    <iframe
      src="//player.bilibili.com/player.html?aid=423008586&bvid=BV1r3411e7Fx&cid=480740745&page=1"
      scrolling="no"
      border="0"
      frameborder="no"
      framespacing="0"
      allowfullscreen="true"
    >
    </iframe>
  </div>
</template>
<style>
.demo > iframe {
  width: 100%;
  height: 450px;
}
</style>
```

:::

#### 题目

请你判断一个 9 x 9 的数独是否有效。只需要 根据以下规则 ，验证已经填入的数字是否有效即可。

数字 1-9 在每一行只能出现一次。
数字 1-9 在每一列只能出现一次。
数字 1-9 在每一个以粗实线分隔的 3x3 宫内只能出现一次。（请参考示例图）

注意：

一个有效的数独（部分已被填充）不一定是可解的。
只需要根据以上规则，验证已经填入的数字是否有效即可。
空白格用 '.' 表示。

```js
示例 1：

输入：board =
[
   ["5","3",".",".","7",".",".",".","."]
  ,["6",".",".","1","9","5",".",".","."]
  ,[".","9","8",".",".",".",".","6","."]
  ,["8",".",".",".","6",".",".",".","3"]
  ,["4",".",".","8",".","3",".",".","1"]
  ,["7",".",".",".","2",".",".",".","6"]
  ,[".","6",".",".",".",".","2","8","."]
  ,[".",".",".","4","1","9",".",".","5"]
  ,[".",".",".",".","8",".",".","7","9"]
]
输出：true
示例 2：

输入：board =
[
   ["8","3",".",".","7",".",".",".","."]
  ,["6",".",".","1","9","5",".",".","."]
  ,[".","9","8",".",".",".",".","6","."]
  ,["8",".",".",".","6",".",".",".","3"]
  ,["4",".",".","8",".","3",".",".","1"]
  ,["7",".",".",".","2",".",".",".","6"]
  ,[".","6",".",".",".",".","2","8","."]
  ,[".",".",".","4","1","9",".",".","5"]
  ,[".",".",".",".","8",".",".","7","9"]
]
输出：false
```

解释：除了第一行的第一个数字从 5 改为 8 以外，空格内其他数字均与 示例 1 相同。 但由于位于左上角的 3x3 宫内有两个 8 存在, 因此这个数独是无效的。

#### 解题思路

这种题目应该是有巧解的方法的，我试着根据思路进行解题，最终发现算法的内存消耗和时间都蛮不错的，所以也记录一下解题思路。

![image-20220109161407447](https://vitepress-source.oss-cn-beijing.aliyuncs.com/typoraimage-20220109161407447.png)

根据数独的游戏规则，我们需要判断：

- 数字 1-9 在每一行只能出现一次。
- 数字 1-9 在每一列只能出现一次。
- 每个九宫格内数字 1-9 只能出现一次

行和列都相对好做，只需遍历二位数组时稍加判断即可，相对复杂一点的是如何处理 9 宫格的数字，在这题中，我们需要借助坐标来进行判断，将每个点拆解为如下的坐标：

![image-20220109162713756](https://vitepress-source.oss-cn-beijing.aliyuncs.com/typoraimage-20220109162713756.png)

然后做以下几件事：

- 处理之前先初始化好一个二维数组 `[[], [], [], [], [], [], [], [], []]`,存放每个格子的元素

- 然后将 **行和列分别除 3** 之后 根据行和列的值进行判断应该插入到具体的哪个数组中 根据 `行*3+列` 这个公式

  如：（5，5）这个点 计算之后 行=1 列=1 根据公式 `行\*3+列 = 4` 所以应该放入数组的下标 4 的位置（从 0 开始的）

- 做到这一步就可以解题啦~

#### 源代码

```js
/**
 * @param {character[][]} board
 * @return {boolean}
 */
var isValidSudoku = function (board) {
  let rowGap = [];
  let colGap = [];
  let boxGap = [[], [], [], [], [], [], [], [], []];
  for (let i = 0; i < board.length; i++) {
    // 处理列
    colGap = [];
    for (let l = 0; l < board.length; l++) {
      if (board[l][i] !== '.') {
        if (colGap.includes(board[l][i])) {
          return false;
        } else {
          colGap.push(board[l][i]);
        }
      }
    }

    for (let j = 0; j < board[i].length; j++) {
      // 处理格子
      let m = parseInt(i / 3),
        n = parseInt(j / 3);
      if (board[i][j] !== '.') {
        if (boxGap[m * 3 + n].includes(board[i][j])) {
          return false;
        } else {
          boxGap[m * 3 + n].push(board[i][j]);
        }
      }
      // 处理行
      if (j === 0) {
        rowGap = [];
      }
      if (j <= board[i].length - 1) {
        if (board[i][j] !== '.') {
          if (rowGap.includes(board[i][j])) {
            return false;
          } else {
            rowGap.push(board[i][j]);
          }
        }
      }
    }
  }
  return true;
};
```

## 括号生成

::: tip 考点
难度：**中级**

思想：**递归**、**回溯**
:::

---

:::demo

```vue
<template>
  <div class="demo">
    <iframe
      src="//player.bilibili.com/player.html?aid=680331744&bvid=BV1cS4y1T7mX&cid=473737161&page=1"
      scrolling="no"
      border="0"
      frameborder="no"
      framespacing="0"
      allowfullscreen="true"
    >
    </iframe>
  </div>
</template>
<style>
.demo > iframe {
  width: 100%;
  height: 450px;
}
</style>
```

:::

#### 题目

示例 1：

> 输入：n = 3
>
> 输出：["((()))","(()())","(())()","()(())","()()()"]

示例 2：

> 输入：n = 1
> 输出：["()"]

递归思想：让函数帮我们做一些特别复杂的计算，我们只告诉递归算法在什么时候应该递归，在什么时候应该停止递归

---

#### 什么时候应该递归？

- 左括号的数量小于数字 n = 3 时，可以递归

  当左括号的数量少于 n 时，说明可以继续的递归添加左括号或者右括号

- 右括号数量小于左括号数量时，可以递归

  右括号的数量小于左括号的时候，可以在这个基础上进行添加右括号，至左右括号数量相等

#### 什么时候应该停止递归？

- 左括号的数量+右括号的数量 === N\*2 就应该退出递归

#### 完整代码

```js
/**
 * @param {number} n
 * @return {string[]}
 */
var generateParenthesis = function (n) {
  let arr = []; // 存放结果数组
  diff(0, 0, n, '');
  /**
   * @param {number} left
   * @param {number} right
   * @param {number} n
   * @param {string} str
   */
  function diff(left, right, n, str) {
    // 什么时候应该退出呢？
    // 左括号的数量+右括号的数量 === N*2 就应该退出递归
    if (left + right === n * 2) {
      arr.push(str);
      return;
    }

    // 什么时候应该递归？
    // 左括号的数量小于数字 n = 3 时，可以递归
    if (left < n) {
      //  n == 3 (( =》 (((
      diff(left + 1, right, n, str + '(');
    }

    // 右括号数量小于左括号数量时，可以递归
    if (right < left) {
      //  (() =》 (()) (())( => (())()
      diff(left, right + 1, n, str + ')');
    }
  }
};

generateParenthesis(3); // ["((()))","(()())","(())()","()(())","()()()"]
```

## 组合总和

::: tip 考点
难度：**中级**

思想：**回溯**
:::

---

:::demo

```vue
<template>
  <div class="demo">
    <iframe
      src="//player.bilibili.com/player.html?aid=678071060&bvid=BV1Bm4y1D7jJ&cid=482357628&page=1"
      scrolling="no"
      border="0"
      frameborder="no"
      framespacing="0"
      allowfullscreen="true"
    >
    </iframe>
  </div>
</template>
<style>
.demo > iframe {
  width: 100%;
  height: 450px;
}
</style>
```

:::

#### 题目

给你一个 无重复元素 的整数数组  candidates 和一个目标整数  target ，找出  candidates  中可以使数字和为目标数  target 的 所有不同组合 ，并以列表形式返回。你可以按 任意顺序 返回这些组合。

candidates 中的 同一个 数字可以 无限制重复被选取 。如果至少一个数字的被选数量不同，则两种组合是不同的。

对于给定的输入，保证和为  target 的不同组合数少于 150 个。

示例  1：

输入：candidates = [2,3,6,7], target = 7
输出：[[2,2,3],[7]]
解释：
2 和 3 可以形成一组候选，2 + 2 + 3 = 7 。注意 2 可以使用多次。
7 也是一个候选， 7 = 7 。
仅有这两种组合。
示例  2：

输入: candidates = [2,3,5], target = 8
输出: [[2,2,2,2],[2,3,3],[3,5]]
示例 3：

输入: candidates = [2], target = 1
输出: []
示例 4：

输入: candidates = [1], target = 1
输出: [[1]]
示例 5：

输入: candidates = [1], target = 2
输出: [[1,1]]

#### 解题思路

这个也是回溯的基本题，回溯的题目都是基本递归的一个套路，需要记住回溯问题的套路 ， 不断递归，到符合条件的适合退出，且记住在递归的过程中会去掉不符合条件的情况。也就是 “回溯会减支” 这个过程。

本题逻辑，目标值是 target 我们应该是 target 不断的减去数组的每一项， 直到 target 这个值为 0 的情况 则代表的是已经结束的情况
减去每个值时 剩余的值就变成新的 target
当用剩余值再继续执行和剩余数组每个值进行相加，并将减去的值存放进入临时数组

- 一旦 target 等于 0 时， 说明符合情况 将这个数组存入到这个结果中
- 一旦 target<要相加的项时 说明不符合继续回溯的情况了，进行 “减支”

**原型图**

![回溯剪支过程](http://vitepress-source.oss-cn-beijing.aliyuncs.com/listdemo.jpg)

#### 源代码

```js
/**
 * @param {number[]} candidates
 * @param {number} target
 * @return {number[][]}
 */
var combinationSum = function (candidates, target) {
  let res = [];
  let temp = [];
  candidates.sort((a, b) => a - b);
  handleBack(candidates, 0, target);
  function handleBack(arr, start, target) {
    if (target === 0) {
      res.push([...temp]);
      return;
    }
    for (let i = start; i < arr.length; i++) {
      if (arr[i] > target) break;
      temp.push(arr[i]); // 添加一个值 分别将每个值都相加 放入递归函数中执行
      handleBack(arr, i, target - arr[i]); // 将添加一个值的情况进入回溯递归
      temp.pop(); // 再去掉这个值 因为这个数组 后面还要加入其他的值  这个非常的关键！！！
    }
  }
  return res;
};
```

## 组合总和 Ⅱ

::: tip 考点
难度：**中级**

思想：**回溯**
:::

---

:::demo

```vue
<template>
  <div class="demo">
    <iframe
      src="//player.bilibili.com/player.html?aid=678073980&bvid=BV1zm4y1D7k8&cid=482993426&page=1"
      scrolling="no"
      border="0"
      frameborder="no"
      framespacing="0"
      allowfullscreen="true"
    >
    </iframe>
  </div>
</template>
<style>
.demo > iframe {
  width: 100%;
  height: 450px;
}
</style>
```

:::

#### 题目

给你一个由候选元素组成的集合 candidates 和一个目标数 target ，找出 candidates 中所有可以使数字和为 target 的组合。

candidates 中的每个元素在每个组合中只能使用 一次 。

注意：解集不能包含重复的组合。

示例 1:

输入: candidates = [10,1,2,7,6,1,5], target = 8,
输出:
[
[1,1,6],
[1,2,5],
[1,7],
[2,6]
]
示例 2:

输入: candidates = [2,5,2,1,2], target = 5,
输出:
[
[1,2,2],
[5]
]

#### 解题思路

这题和第 39 题是一样的，都是可以通过回溯的形式进行解题，不断的递归
这题和上一题相比，多的条件是

- 每个值不能出现重复使用的情况
- 数组的元素会出现重复

本题逻辑，目标值是 target 我们应该是 target 不断的减去数组的每一项， 直到 target 这个值为 0 的情况 则代表的是已经结束的情况
减去每个值时 剩余的值就变成新的 target
当用剩余值再继续执行和剩余数组每个值进行相加，并将减去的值存放进入临时数组

- 当前要减的值和前一个值相同的时候，就不需要继续做的直接下一个（这个是因为相同的值重复了）
- 一旦 target 等于 0 时， 说明符合情况 将这个数组存入到这个结果中
- 一旦 target<要相加的项时 说明不符合继续回溯的情况了，进行 “减支”

**原型图**

![回溯剪支过程](http://vitepress-source.oss-cn-beijing.aliyuncs.com/40demo.png)

**原型图**

**效果**

![最终效果](http://vitepress-source.oss-cn-beijing.aliyuncs.com/40res.png)

#### 源代码

```js
/**
 * @param {number[]} candidates
 * @param {number} target
 * @return {number[][]}
 */
var combinationSum = function (candidates, target) {
  let res = [];
  let temp = [];
  candidates.sort((a, b) => a - b);
  handleBack(candidates, 0, target);
  function handleBack(arr, start, target) {
    if (target === 0) {
      res.push([...temp]);
      return;
    }
    for (let i = start; i < arr.length; i++) {
      if (arr[i] > target) break;
      if (i > start && arr[i] === arr[i - 1]) {
        // 当前要减的值和上一个值相同时，不需要处理
        continue;
      } else {
        temp.push(arr[i]);
        handleBack(arr, i + 1, target - arr[i]);
        temp.pop();
      }
    }
  }
  return res;
};
```

## 全排列

::: tip 考点
难度：**中级**

思想：**回溯**
:::

:::demo

```vue
<template>
  <div class="demo">
    <iframe
      src="//player.bilibili.com/player.html?aid=765947112&bvid=BV1Br4y1e7fV&cid=493288637&page=1"
      scrolling="no"
      border="0"
      frameborder="no"
      framespacing="0"
      allowfullscreen="true"
    >
    </iframe>
  </div>
</template>
<style>
.demo > iframe {
  width: 100%;
  height: 450px;
}
</style>
```

:::

#### 题目

给定一个不含重复数字的数组 nums ，返回其 所有可能的全排列 。你可以 按任意顺序 返回答案。

示例 1：

输入：nums = [1,2,3]
输出：[[1,2,3],[1,3,2],[2,1,3],[2,3,1],[3,1,2],[3,2,1]]
示例 2：

输入：nums = [0,1]
输出：[[0,1],[1,0]]
示例 3：

输入：nums = [1]
输出：[[1]]

#### 解题思路

本题是一个全排列题目，这题其实和匹配括号是有点像的，可以使用回溯的方式来进行解决！

- 创建两个数组 一个空数组 一个存放 nums
- 每次递归都往第一个数组中存放一个 nums 中的一个值 nums 就减去一个值 之后再次进入递归
- 递归不断执行上面那个过程的
- 当 nums 为空时 说明已经全部添加完成了 这时候将这个结果存入 结果数组中
- 最后将这个结果数组进行返回即可。

**原型图**

![image-20220126203754555](https://vitepress-source.oss-cn-beijing.aliyuncs.com/typoraimage-20220126203754555.png)

**效果**



#### 源代码

```js
/**
 * @param {number[]} nums
 * @return {number[][]}
 */
var permute = function (nums) {
  if (nums.length === 1) {
    return [nums];
  }
  let res = [];
  const diff = (path, parameter) => {
    if (parameter.length === 0) {
      res.push(path);
      return;
    }
    for (let i = 0; i < parameter.length; i++) {
      let item = parameter[i];
      parameter.splice(i, 1);
      diff([...path, item], parameter);
      parameter.splice(i, 0, item);
    }
  };
  diff([], nums);
};
permute([1, 2, 3]);
```

## 全排列 Ⅱ

::: tip 考点
难度：**中级**

思想：**回溯**
:::

#### 题目

给定一个可包含重复数字的序列 nums ，按任意顺序 返回所有不重复的全排列。

示例 1：

输入：nums = [1,1,2]
输出：
[[1,1,2],
 [1,2,1],
 [2,1,1]]
示例 2：

输入：nums = [1,2,3]
输出：[[1,2,3],[1,3,2],[2,1,3],[2,3,1],[3,1,2],[3,2,1]]


提示：

1 <= nums.length <= 8
-10 <= nums[i] <= 10

#### 解题思路



 这题的解题思路和上一题是 全排列 是一样的，区别在于多了一个条件

  - 数组内容可能会有重复的数字

 所以整体的逻辑和上一题基本保持一致，使用回溯的套路即可快速解题。因为数组的成员可能会重复，所以和上一题相比会多几步操作：

1. 先将整个数组进行一次排序

2. 我们我们分别创建两个数组 一个空数组 一个存放nums

3. 每次递归都往第一个数组中存放一个nums中的一个值  nums就减去一个值

4. 如果nums中取的值和前一个取的值一样，则直接跳过 取下一个值

5. 递归不断执行上面那个过程的

6. 当nums为空时 说明已经全部添加完成了 这时候将这个结果存入 结果数组中

7. 最后将这个结果数组进行返回即可。

**原型图**

![image-20220126203754555](https://vitepress-source.oss-cn-beijing.aliyuncs.com/typoraimage-20220126203754555.png)

**效果**

![成绩](https://vitepress-source.oss-cn-beijing.aliyuncs.com/res1.png)

#### 源代码

```js
/**
 * @param {number[]} nums
 * @return {number[][]}
 */
var permuteUnique = function (nums) {
  if (nums.length === 1) {
    return [nums];
  }
  nums.sort((a, b) => a - b);
  let res = [];
  let temp = null;
  const diff = (path, params) => {
    if (params.length === 0) {
      res.push(path);
      return;
    }
    for (let i = 0; i < params.length; i++) {
      if (params[i] === params[i - 1]) {
        continue;
      } else {
        temp = params[i];
        params.splice(i, 1);
        diff([...path, temp], params);
        params.splice(i, 0, temp);
      }
    }
  };
  diff([], nums);
  return res
};
```


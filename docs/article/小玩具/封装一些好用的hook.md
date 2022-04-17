# 封装一些好用的hooks

::: tip 跟大家安利一个非常好用的hooks工具库~~

[@shihengtech/hooks](https://shiheng-fe.github.io/hooks/use-loading)，是我现在所在公司的前辈自行封装的一些hooks，其中的一些hooks几乎都是我目前开发的项目中的一些必备的hooks。

学习源码，并且自己也封装了一遍，源码在：[hooks](https://github.com/Jimmylxue/hooks)

:::

> 因为我读源码的能力非常薄弱，大框架的源码几乎很难看懂，所以从小工具库入手学习读源码对我来说是一个非常不错的提示这一块能力的方式，所以决定自己也来在读了源码之后自行封装一下。

## useLocalStorageState

顾名思义，和useState一样，会创建一个和useState一样的数据结构，这个数据会被保存到浏览器的`localStorage`中，通过setSLocalStroage也能实现页面的渲染。

### 用处

因为被存入到了`localStorage` 中，所以不会像`useState`这种存入内存中的数据，刷新一下就丢失数据的情况，可以实现整个应用下的数据共享与持久化。

### 最终目标

```tsx
const [state,setState] = useLocalStorageState('JimmyKey',1)

setTimeout(setState(v=>v++))
```

### Types

```ts
useLocalStroage<T>(key: string, defaultValue?: T | (() => T)): readonly [T, React.Dispatch<React.SetStateAction<T>>];
```

## API

```typescript
const [state, setState] = useLocalStorageState<T>(key: string, defaultValue?: T | (() => T));
```

### Params


|  参数 | 说明 | 类型 | 默认值 |
|  ----  | ----  |----  |----  |
| key | 必填，`localStorage` 存储的键值对的键值 |string |- |
| defaultValue | 默认值，会优先以 `localStorage` 中保存的值为准 |any |()=>any |


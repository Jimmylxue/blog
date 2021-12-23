# Hello VitePress

hello world
| Tables | Are | Cool |
| ------------- |:-------------:| -----:|
| col 3 is | right-aligned | $1600 |
| col 2 is | centered | $12 |
| zebra stripes | are neat | $1 |

::: tip
This is a tip
:::

::: warning
This is a warning
:::

::: danger
This is a dangerous warning
:::

::: danger STOP
Danger zone, do not proceed
:::

<!-- <img :src="$withBase('/bg.jpg')" alt="foo" /> -->

![An image](/assets/bg.jpg)

```html
<img :src="$withBase('/bg.jpg')" alt="foo" />
```

```js{4}
export default {
  data () {
    return {
      msg: 'Highlighted!'
    }
  }
}
```

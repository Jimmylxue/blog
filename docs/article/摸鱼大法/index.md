# hello JavaScript

this is a first page

::: warning
This is a warning
:::

:::demo

```vue
<template>
  <div class="alert-demo-1" @click="go">点我一下</div>
</template>

<script setup>
const go = () => {
  console.log("comming");
};
</script>

<style>
.alert-demo-1 {
  cursor: pointer;
}
.alert-demo-1 .devui-alert {
  margin-bottom: 20px;
  color: red;
}
</style>
```

:::

:::demo

```vue
<template>
  <div class="alert-demo-1" @click="go">点我222</div>
</template>

<script setup>
const go = () => {
  console.log("hhh");
};
</script>

<style>
.alert-demo-1 {
  cursor: pointer;
}
.alert-demo-1 .devui-alert {
  margin-bottom: 20px;
  color: red;
}
</style>
```

:::

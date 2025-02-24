---
layout: home

hero:
  name: 前端加油站
  text: 分享技术，记录生活
  tagline: 永远相信，美好的事情即将发生!
  image:
    src: https://vitepress-source.oss-cn-beijing.aliyuncs.com/typoraimage-20220326203849385.png
    alt: logo
  actions:
    - theme: brand
      text: 进入阅读
      link: /base
    - theme: alt
      text: 进入仓库
      link: https://github.com/Jimmylxue/blog

features:
  - icon: 🙈
    title: 小技巧分享
    details: 分享前端一些小技巧&周边内容
    link: /front-end/工程/pnpm打补丁
  - icon: 🧱
    title: 前端效果case
    details: 前端效果case
    link: /front-end-case/UI效果/滚动时文字渐入效果
  - icon: 📝
    title: 读书分享
    details: 读书分享&感悟
    link: /reading/softSkill/你要如何衡量你的人生
  - icon: 🌱
    title: work life balance
    details: 生活记录
    link: /life/other/base
  - icon: 🧐
    title: 跟着吉米学后端
    details: 跟着吉米学后端
    link: /back-end/mysql/前端程序员——你可能不知道的表命名知识
  - icon: ✨
    title: snow-todoList
    details: todolist 基于monorepo架构下 react + nest.js 全栈项目，麻雀虽小五脏俱全
    link: http://www.jimmyxuexue.top:668/#/todolist
  - icon: 🔥
    title: snow-tiny
    details: snow-tiny 是一个专为前端同学开发的基于 tiny 的简单、轻量级的图片压缩工具。只需三步，就可实现图片自动化压缩，极大提高效率和压缩体验！
    link: /snowtiny/guide/introduce
  - icon: ⚡️
    title: easy-watermark
    details: watermark是一个基于canvas的简单的生成自定义水印的插件，轻量、灵活、配置简单是它的特点。可以非常快速创建水印、马赛克功能。
    link: /watermark/guide/introduce
    # linkText: 'link it'
  - icon: 🖖
    title: snowIndex
    details: 学习程序员鱼皮，用其他技术栈开发极客风网站首页，在线访问：http://www.jimmyxuexue.top:668/
    link: https://github.com/Jimmylxue/snowIndex
    # linkText: 'link it'
  - icon: 🛠️
    title: Vitality-reminder
    details: 利用微信订阅号的方式，给女朋友每天定时定时推送消息。 如果还没有女朋友的这个可以祝你一臂之力
    link: https://github.com/Jimmylxue/Vitality-reminder
    # linkText: 'link it'
  - icon: 🔖
    title: React
    details: React知识点
    link: /react/useEffect/dependencies
  - icon: ✏️
    title: deep-learning
    details: 深入学习-前端知识
    link: /deep-learning/masterClass/event-loop
  - icon: 🚀
    title: job
    details: 工作相关
    link: /job/面试题/实习
  - icon: ✅
    title: TDD
    details: 测试驱动开发
    link: /TDD/1-介绍/关于TDD
---

<script setup>
import Member from '../components/Member.vue'
</script>

<Member />

<style>
  
  /* 宽度大于 640 采用的样式 */
@media (min-width: 640px) {
  .VPFeatures>.container>.items>.item{
    width: calc(100% / 4);
  }
}

/* 宽度大于 960 采用的样式 */

@media (min-width: 960px) {
  .VPFeatures>.container>.items>.item{
    width: calc(100% / 4);
  }
}
</style>

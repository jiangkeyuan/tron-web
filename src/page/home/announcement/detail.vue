<template>
  <Content>
    <div class="crumbs-wrapper">
      当前位置：
      <a href="/">首页</a>
      -
      <a href="/announcement">平台公告</a>
    </div>
    <article class="article">
        <h1>xxxxx</h1>
        <div>
            1233
        </div>
    </article>
  </Content>
</template>

<script setup>
import Content from './content.vue'
</script>

<style lang="less" scoped>
.crumbs-wrapper {
  color: #616674;
  a {
    color: inherit;
  }
}
.article {
  margin-top: 30px;
  min-height: 400px;
  line-height: 1.6em;
   h1 {
    text-align: center;
    font-size: 24px;
    line-height: 1.6em;
}
}
</style>

<template>
  <article class="feq-root">
    <div class="feq-content">
      <h1>{{ title }}</h1>
      <div v-html="content"></div>
    </div>
  </article>
</template>

<script setup>
import detail from './detail'
console.log(detail)
const route = useRoute()
const title = detail[route.params.id]?.title
const content = detail[route.params.id]?.content
</script>

<style lang="less" scopde>
.feq-root {
  position: relative;
  min-height: calc(100vh - 170px);
  padding: 1.25rem 0;
  background-color: #f6f6f6;
  .feq-content {
    max-width: 81.25rem;
    height: auto;
    margin: 0 auto;
    padding: 1.25rem 1.25rem 2.5rem;
    background: #fff;
  }
  h1 {
    display: block;
    font-size: 1.625rem;
    -webkit-margin-before: 1.25rem;
    margin-block-start: 1.25rem;
    -webkit-margin-after: 1.25rem;
    margin-block-end: 1.25rem;
    -webkit-margin-start: 0px;
    margin-inline-start: 0px;
    -webkit-margin-end: 0px;
    margin-inline-end: 0px;
    font-weight: 700;
  }
  p {
    font-size: 0.875rem;
    line-height: 1.875rem;
    color: #000000d9;
  }
}
</style>

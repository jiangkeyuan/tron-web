<template>
  <div class="page">
    <div class="page-content">
      <slot></slot>
    </div>
  </div>
</template>

<script></script>

<style scoped>
.page {
  overflow: hidden;
}
.page-content {
  margin: 30px auto;
  padding: 30px;
  max-width: 1300px;
  box-shadow: 0 0 10px #0000001a;
}
</style>

<template>
  <footer>COPYRIGHT © {{ new Date().getFullYear() }} hashgo.xyz</footer>
</template>

<script setup></script>

<style lang="less" scoped>
footer {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100px;
  background-color: @color;
  color: #fff;
}
</style>

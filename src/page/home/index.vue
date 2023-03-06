<template>
  <Header></Header>
  <router-view></router-view>
</template>

<script setup>
import Header from '@/components/Header.vue'
import { ref } from 'vue'
const handleSelect = (key, keyPath) => {
  console.log(key, keyPath)
}
onMounted(() => {})
</script>


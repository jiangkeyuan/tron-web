<template>
  <Header @itemClick="itemClick"></Header>
  <router-view></router-view>
  <Footer></Footer>
  <recommend-popup-wrapper></recommend-popup-wrapper>
</template>

<script setup>
import Header from '@/components/Header.vue'
import recommendPopupWrapper from '@/components/recommend-popup-wrapper.vue'
import { ref } from 'vue'
// const handleSelect = (key, keyPath) => {
//   console.log(key, keyPath)
// }
const itemClick = ({key}) => {
    console.log(key);
}
onMounted(() => {})
</script>


<template>
    <div>
        <router-link to="/buyer/sale-record">/buyer/sale-record</router-link>
        <router-link to="/buyer/dashboard">/buyer/dashboard</router-link>

        <router-view v-slot="{ Component }">
            <Transition name="slide-up">
                <component :is="Component" />
            </Transition>
        </router-view>
        
    </div>
</template>
<script setup>
</script>
<style scoped>
.slide-up-enter-active,
.slide-up-leave-active {
  transition: all 0.5s ease-out;
}

.slide-up-enter-from {
  opacity: 0;
  transform: translateX(-100px);
}

.slide-up-leave-to {
  opacity: 0;
  display:none;
  transform: translateX(100px);
}
</style>
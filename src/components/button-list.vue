<template>
     <el-radio-group v-model="tabPosition">
        <el-radio-button label="1">1小时</el-radio-button>
        <!-- <el-radio-button label="24">1天</el-radio-button> -->
        <el-radio-button label="72">3天</el-radio-button>
    </el-radio-group>
</template>
<script setup>
const emit = defineEmits(['update:rentalDays'])
const props = defineProps({
    rentalDays:'1'
})

const tabPosition = ref(props.rentalDays);

watch(tabPosition,(n,o)=>{
    emit('update:rentalDays', n);
})
</script>
<style scoped>
</style>
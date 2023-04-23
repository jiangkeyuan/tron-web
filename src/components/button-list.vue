<template>
     <el-radio-group v-model="tabPosition">
        <el-radio-button label="1">1{{$t('MANUAL-006')}}</el-radio-button>
        <!-- <el-radio-button label="24">1天</el-radio-button> -->
        <el-radio-button label="72">3{{$t('MANUAL-007')}}</el-radio-button>
    </el-radio-group>
</template>
<script setup>
import { useI18n } from 'vue-i18n'
const { t } = useI18n()
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
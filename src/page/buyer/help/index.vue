<template>
    <el-form :model="form" inline>
        <el-form-item label="Activity name">
            <el-input v-model="form.name" />
        </el-form-item>
        <el-form-item label="Activity name">
            <el-input v-model="form.name" />
        </el-form-item>
        <el-form-item label="Activity name">
            <el-date-picker
                v-model="form.date"
                type="daterange"
                range-separator="To"
                start-placeholder="Start date"
                end-placeholder="End date"
            />
        </el-form-item>
    </el-form>
</template>
<script setup>
const form = reactive({});
</script>
<style scoped>
</style>
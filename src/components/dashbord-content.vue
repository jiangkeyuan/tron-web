<template>
    <div class="dashbord-content">
       <slot></slot>
    </div> 
</template>
<script setup></script>
<style scoped>
.dashbord-content{
    padding: 24px;
    box-sizing: border-box;
    color: #000000d9;
    font-size: 14px;
    font-variant: tabular-nums;
    line-height: 1.5715;
    font-feature-settings: tnum;
    background: #fff;
    border-radius: 5px!important;
    border: 1px solid #c8d0df!important;
    margin-bottom: 10px;
}
</style>
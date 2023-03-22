<template>
    <div class="help-content">
        <slot></slot>
    </div>
</template>
<style scoped>
.help-content{
    box-sizing: border-box;
    margin: 0;
    padding: 0;
    color: #000000d9;
    font-size: 14px;
    font-variant: tabular-nums;
    line-height: 1.5715;
    list-style: none;
    font-feature-settings: tnum;
    position: relative;
    background: #fff;
    border-radius: 2px;
    border: 1px solid #f0f0f0;
    padding: 24px;
    border-radius: 15px;
}
</style>
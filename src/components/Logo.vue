<template>
    <div class="tron-web-logo">
        <img src="@/assets/logo/logo.svg" alt="" class="tron-web-logo-img"/>
        <span class="tron-web-logo-title">{{props.title}}</span>
    </div>
</template>
<script setup>
const props = defineProps({
    title:{
        type: String,
        default: "Feee.io"
    }
});
</script>
<style scoped>
.tron-web-logo{
    display: flex;
    flex-direction: row;
    align-items: center;
    transform: scale(1.35);
}
.tron-web-logo-img{
    width:25px;
    height:auto; 
}
.tron-web-logo-title {
    font-size: 16px;
    font-weight: 700;
    transition: all .5s;
    margin-left:10px;
}
</style>
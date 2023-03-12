<template>
    <DashBord>
        <div @click="gotoHelp('')" class="help"><img src="@/assets/home/doc-s1.svg" class="help-img"/><span class="help-text">如何使用API租用能量？</span></div>
        <div @click="gotoHelp('help/set-api-key')" class="help"><img src="@/assets/home/doc-s1.svg" class="help-img"/><span class="help-text">如何设置创建API安全密钥？</span></div>
        <div @click="gotoHelp('help/recharge/')" class="help"><img src="@/assets/home/doc-s1.svg" class="help-img"/><span class="help-text">租金用量不足时，如何充值？</span></div>
        <div @click="gotoHelp('help/withdraw')" class="help"><img src="@/assets/home/doc-s1.svg" class="help-img"/><span class="help-text">余额用不完怎么办，如何提现？</span></div>
    </DashBord>
</template>
<script setup>
import DashBord from "@/components/dashbord-content.vue";
import { useRouter } from "vue-router";
const router = useRouter();
const form = reactive({});
const gotoHelp = (route)=>{
    router.push(route);
}
</script>
<style scoped>
.help{
    display: flex;
    flex-direction: row;
    height: 22px;
    justify-items: center;
    align-items: center;
    cursor: pointer;
    margin: 14px 0;
}
.help-img{
    width: 16px;
    height: 16px;
    margin-right: 5px;
}
.help:hover{
    color: #294aa5;
}
</style>
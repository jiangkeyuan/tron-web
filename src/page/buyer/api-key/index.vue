<template>
    <div class="api-key">
        <el-button class="api-key-button" type="primary">创建API密钥</el-button>
        <div class="api-key-content">
            <DashBord>
                <div class="api-key-content-header">
                    <div class="api-key-content-header-left">
                        <span class="api-key-content-header-left-title">1111</span>
                        <span class="api-key-content-header-left-edit">编辑</span>
                    </div>
                    <div class="api-key-content-header-left">
                        <span class="api-key-content-header-left-title api-key-content-header-left-title-color">e7311742-6980-4959-825d-f3e20b7cf4ed</span>
                        <el-icon size="15" @click="copyEnd" class="recharge-content-address-icon" color="#294aa5"><CopyDocument /></el-icon>
                    </div>
                </div>

                <div class="api-key-content-header-body">
                    <div class="api-key-content-header-body-item">
                        <span class="api-key-content-header-body-item-key">今日租用:</span>
                        <span class="api-key-content-header-body-item-value">0 能量 / 消耗 0 TRX</span>
                    </div>

                    <div class="api-key-content-header-body-item">
                        <span class="api-key-content-header-body-item-key">今日租用:</span>
                        <span class="api-key-content-header-body-item-value">0 能量 / 消耗 0 TRX</span>
                    </div>
                </div>

            </DashBord>
        </div>

        <div class="api-key-content">
            <DashBord>
                <div class="api-key-content-header">
                    <div class="api-key-content-header-left">
                        <span class="api-key-content-header-left-title">1111</span>
                        <span class="api-key-content-header-left-edit">编辑</span>
                    </div>
                    <div class="api-key-content-header-left">
                        <span class="api-key-content-header-left-title api-key-content-header-left-title-color">e7311742-6980-4959-825d-f3e20b7cf4ed</span>
                        <el-icon size="15" @click="copyEnd" class="recharge-content-address-icon" color="#294aa5"><CopyDocument /></el-icon>
                    </div>
                </div>

                <div class="api-key-content-header-body">
                    <div class="api-key-content-header-body-item">
                        <span class="api-key-content-header-body-item-key">今日租用:</span>
                        <span class="api-key-content-header-body-item-value">0 能量 / 消耗 0 TRX</span>
                    </div>

                    <div class="api-key-content-header-body-item">
                        <span class="api-key-content-header-body-item-key">今日租用:</span>
                        <span class="api-key-content-header-body-item-value">0 能量 / 消耗 0 TRX</span>
                    </div>
                </div>

            </DashBord>
        </div>
    </div>
    
</template>

<script setup>
import DashBord from '@/components/dashbord-content.vue';
import { copy } from '@/utils/utils/index.js';

const copyEnd = (msg)=>{
    copy({
        msg,
        callback:()=>{
            ElMessage.success('复制成功');
        }
    })
}
</script>
<style scoped>
.api-key{
    text-align: end;
    padding: 16px 0;
}
.api-key-content{
    margin-top: 20px;
}
.api-key-content-header{
    height: 38px;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    box-sizing: border-box;
}
.api-key-content-header-left{
    font-size: 16px;
    height: 100%;
    line-height: 38px;
}
.api-key-content-header-left-title{
    margin-right: 15px;
}
.api-key-content-header-left-edit{
    font-size: 14px;
    color: #294aa5;
    cursor: pointer;
}
.recharge-content-address-icon{
    cursor: pointer;
}
.api-key-content-header-left-title-color{
    color: #707582;
    font-size: 15px;
}
.api-key-content-header-body{
    width: 100%;
    background: #f4f8ff;
    border-radius: 6px;
    margin-top: 30px;
    text-align: start;
    box-sizing: border-box;
    padding-left: 20px;
    height: 150px;
    display: flex;
    flex-direction: column;
    justify-content: center;
}
.api-key-content-header-body-item{
    height: 32px;
    padding: 10px 0;
    font-size: 15px;
}
.api-key-content-header-body-item-key{
    text-align: right;
    width: 80px;
    height: 32px;
    color:black;
}
.api-key-content-header-body-item-value{
    margin-left: 15px;
    color: #266ef1;
}

</style>
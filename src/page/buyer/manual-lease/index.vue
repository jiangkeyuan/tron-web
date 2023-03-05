<template>
    <div class="maual-lease">
        <el-form :model="form" label-width="200px" label-position="left">
            <el-form-item label="可用余额:" class="maual-lease-item">
                <span>165.880744 TRX</span>
            </el-form-item>
            <el-form-item label="租用量:" >
                <div class="maual-lease-item-energy">
                    <el-input v-model="form.name">
                        <template #append>Energy</template>
                    </el-input>
                    <span class="maual-lease-item-energy-text">
                        大约需要支付
                        <span class="maual-lease-item-energy-text-num">4.933333333324445e+57</span>
                        TRX
                    </span>
                </div>
            </el-form-item>
            <el-form-item label="租用天数:" class="maual-lease-item">
                <el-input-number class="el-input-number" v-model="form.date" :min="1" :max="10" @change="handleChange" />
            </el-form-item>
            <el-form-item label="接收地址:" class="maual-lease-item">
                <el-input v-model="form.name" />
            </el-form-item>
            <el-form-item class="maual-lease-item">
                <el-button type="primary">租 用</el-button>
                <el-button link type="primary">批量租赁</el-button>
            </el-form-item>
        </el-form>
    </div> 
</template>
<script setup>
const form = reactive({});
</script>
<style scoped>
.maual-lease{
    margin: 16px;
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
}
.maual-lease-item{
    width: 600px;
}
.el-input-number{
    width: 400px;
}
.el-input-group--append{
    width: 400px;
}
.maual-lease-item-energy{
    display: flex;
    flex-direction: row;
}
.maual-lease-item-energy-text{
    margin-left: 20px;
    color: #989fae;
}
.maual-lease-item-energy-text-num{
    color: #1890ff;
}
</style>
<template>
    <HelpContent>
        <div class="help-set-api-key">
            <div>进入Hashgo.xyz管理面板，点击创建KEY，输入名称（Key名称为方便区别和统计，可按需求自定义名称，比如项目名称），点击创建即可。</div>
            <img class="help-set-api-key-img" src="@/assets/help/api-create.png"/>
            <div>注：每个账户最多可创建3个API-Key，删除后API租用统计不可找回</div>
        </div>
    </HelpContent>
</template>

<script setup>
import HelpContent from "../help-content.vue";
</script>
<style scoped>
.help-set-api-key-img{
    width: 100%;
    height: auto;
    margin:10px 0 5px;
}
</style>
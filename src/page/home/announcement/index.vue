<template>
  <Content>
     <h1>平台公告</h1>
      <ul class="list">
        <li>
          <a href="/announcement/detail" class="item">
            <h2 class="title">全新TG自助服务机器人公测上线</h2>
            <time class="date">2022/12/29</time>
            <p class="brief">能量租用 | TRX\USDT兑换 | 钱包查询 | 交易监控</p>
          </a>
        </li>
      </ul>
      <el-empty v-if="false" description="暂无公告" />
  </Content>
</template>

<script setup>
import Content from './content.vue'
</script>

<style lang="less" scoped>
.page-content {
  h1 {
    margin-bottom: 20px;
    padding-left: 5px;
    border-left: 4px solid #2a4da0;
    font-size: 24px;
  }
  .list {
    min-height: 800px;
    .item {
      display: grid;
      grid-template-areas:
        'title date'
        'brief brief';
      grid-template-columns: 1fr auto;
      gap: 10px;
      padding: 20px 0;
      border-bottom: 1px solid #f2f2f2;
      color: #333;
      .title {
        grid-area: title;
        line-height: 1.4em;
      }
      .date {
        grid-area: date;
        text-align: right;
      }
      .brief {
        grid-area: brief;
        line-height: 1.4em;
      }
    }
  }
}
</style>
<style lang="less">
.page-content {
  .el-empty {
    min-height: 500px;
  }
}
</style>

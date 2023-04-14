<template>
  <DashbordContent>
    <div class="statistics-panel">
      <div class="statistics-root">
        <div class="item" v-for="item in platformIncome">
          <div class="flex">
            <div class="item-tltle">
              {{ item.date }}平台收益汇总
            </div>
            <div class="font icon-question">
              <Tips content="收益利润=订单收益+投票收益"></Tips>
            </div>
          </div>
          <div class="flex">
            <div>
              <div>
                <span class="font"> 笔数: </span>
                <span class="font text red">{{ item.numtotal?.toLocaleString() || 0 }}</span>
                <span class="font min-font">笔</span>
              </div>
              <div>
                <span class="font"> 总额: </span>
                <span class="font text red">{{ item.amounttotal?.toLocaleString() || 0 }}</span>
                <span class="font min-font">TRX</span>
              </div>
            </div>
            <div class="icon"></div>
          </div>
        </div>
      </div>
    </div>
  </DashbordContent>
  <DashbordContent>
    <div class="statistics-panel">
      <div class="statistics-root">
        <div class="item">
          <div class="flex">
            <div class="item-tltle">
              用户新增卖/买家统计(当日)
              <!-- <span class="font total">(累计收益：<span class="red">{{sellerObj.totalEarnings}}</span>TRX)
                </span> -->
            </div>
            <div class="font icon-question">
              <Tips content="收益利润=订单收益+投票收益"></Tips>
            </div>
          </div>
          <div class="flex">
            <div>
              <div>
                <span class="font">买家:</span>
                <span class="font text red">{{ users.BUYER?.toLocaleString() }}</span>
                <span class="font min-font">个</span>
              </div>
              <div>
                <span class="font">卖家:</span>
                <span class="font text red">{{ users.SELLER?.toLocaleString() }}</span>
                <span class="font min-font">个</span>
              </div>
            </div>
            <div class="icon"></div>
          </div>
        </div>
        <div class="item">
          <div class="flex">
            <div class="item-tltle">
              充值笔数/总额(当日)
              <!-- <span class="font total">(累计收益：<span class="red">26,827.34147</span>TRX)
                </span> -->
            </div>
            <div class="font icon-question">
              <Tips content="收益利润=订单收益+投票收益"></Tips>
            </div>
          </div>
          <div class="flex">
            <div>
              <div>
                <span class="font"> 笔数: </span>
                <span class="font text red">{{ recharge.rechargetotal?.toLocaleString() || 0 }}</span>
                <span class="font min-font">笔</span>
              </div>
              <div>
                <span class="font"> 总额: </span>
                <span class="font text red">{{ recharge.amounttotal?.toLocaleString() || 0 }}</span>
                <span class="font min-font">TRX</span>
              </div>
            </div>
            <div class="icon"></div>
          </div>
        </div>


        <div class="item">
          <div class="flex">
            <div class="item-tltle">
              平台卖家收益(当日)
            </div>
            <div class="font icon-question">
              <Tips content="收益利润=订单收益+投票收益"></Tips>
            </div>
          </div>
          <div class="flex">
            <div>
              <div>
                <span class="font"> 笔数: </span>
                <span class="font text red">{{ sellereIncome.numtotal?.toLocaleString() || 0 }}</span>
                <span class="font min-font">笔</span>
              </div>
              <div>
                <span class="font"> 总额: </span>
                <span class="font text red">{{ sellereIncome.amounttotal?.toLocaleString() || 0 }}</span>
                <span class="font min-font">TRX</span>
              </div>
            </div>
            <div class="icon"></div>
          </div>
        </div>
      </div>
    </div>
  </DashbordContent>
  <DashbordContent>
    <div class="statistics-panel">
      <div class="statistics-root">
        <div class="item" v-for="item in order">
          <div class="flex">
            <div class="item-tltle">
              {{ filterOrderstatus(item.orderstatus) }} (当日)
            </div>
            <div class="font icon-question">
              <Tips content="收益利润=订单收益+投票收益"></Tips>
            </div>
          </div>
          <div class="flex">
            <div>
              <div>
                <span class="font"> 笔数: </span>
                <span class="font text red">{{ item.ordertotal?.toLocaleString() }}</span>
                <span class="font min-font">笔</span>
              </div>
              <div>
                <span class="font"> 总额: </span>
                <span class="font text red">{{ item.amounttotal?.toLocaleString() }}</span>
                <span class="font min-font">TRX</span>
              </div>
            </div>
            <div class="icon"></div>
          </div>
        </div>
      </div>
    </div>
  </DashbordContent>

  <DashbordContent>
    <div class="statistics-panel">
      <div class="statistics-root">
        <div class="item" v-for="item in energy">
          <div class="flex">
            <div class="item-tltle">
              {{ filterEnergy(item.orderstatus) }} (当日)
            </div>
            <div class="font icon-question">
              <Tips content="收益利润=订单收益+投票收益"></Tips>
            </div>
          </div>
          <div class="flex">
            <div>
              <div>
                <span class="font"> 笔数: </span>
                <span class="font text red">{{ item.ordertotal?.toLocaleString() || 0 }}</span>
                <span class="font min-font">笔</span>
              </div>
              <div>
                <span class="font"> 总额: </span>
                <span class="font text red">{{ item.energytotal?.toLocaleString() || 0 }}</span>
                <span class="font min-font">能量</span>
              </div>
            </div>
            <div class="icon"></div>
          </div>
        </div>
      </div>
    </div>
  </DashbordContent>
</template>

<script setup>
import { getStatistics } from "@/utils/axios/buyer/index.js";
import { reactive, ref } from "vue";
const users = reactive({});
const recharge = reactive({});
const sellereIncome = reactive({});
const order = ref([
  {
    ordertotal: 0,
    orderstatus: "DELEGATEING",
    amounttotal: 0.0,
  },
  {
    amounttotal: 0,
    orderstatus: "DONE",
    ordertotal: 0,
  },
  {
    orderstatus: "WAIT_DELEGATE",
    ordertotal: 0,
    amounttotal: 0.0,
  },
]);
const energy = ref([
  {
    ordertotal: 0,
    orderstatus: "DELEGATEING",
    amounttotal: 0.0,
  },
  {
    amounttotal: 0,
    orderstatus: "DONE",
    ordertotal: 0,
  }
]);

const platformIncome = ref([
  { date: "昨日", amounttotal: 0, numtotal: 0 },
  { date: "今日", amounttotal: 0, numtotal: 0 }
]);


const filterArray = (a, b, key = 'orderstatus') => {
  const mergedArray = b.map((item) => {
    const foundItem = a.find((aItem) => aItem[key] === item[key]);
    if (foundItem) {
      return { ...item, ...foundItem };
    }
    return item;
  });
  return mergedArray;
}


const filterOrderstatus = (str) => {
  switch (str) {
    case 'DELEGATEING':
      return '代理中'
    case 'DONE':
      return '已完成代理'
    case 'WAIT_DELEGATE':
      return '等待完成代理'
    default:
      return ''
  }
}

const filterEnergy = (str) => {
  switch (str) {
    case 'DELEGATEING':
      return '消耗能量'
    case 'DONE':
      return '释放能量'
    default:
      return ''
  }
}

const getData = async () => {
  const data = await getStatistics();
  if (data.code == 12000) {
    Object.assign(users, data.data.users);
    Object.assign(recharge, data.data.recharge);
    Object.assign(sellereIncome, data.data.sellereIncome);
    order.value = filterArray(data.data.order, order.value);
    energy.value = filterArray(data.data.energy, energy.value);
    platformIncome.value = filterArray(data.data.platformIncome, platformIncome.value, 'date');
  }
};


getData();
</script>

<style lang="less" scoped>
.vben-basic-table-title {
  font-size: 16px;
}

.statistics-panel {
  display: grid;
  grid-template-columns: 1fr;
  gap: 16px 0;

  .statistics-root {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    gap: 20px;
    background: #ffffff;

    // border-radius: 4px;
    // padding: 20px;
    .item {
      padding: 20px;
      background: #f4f8ff;
      border-radius: 10px;
    }

    .item-tltle {
      font-size: 15px;
      font-family: PingFang SC, PingFang SC-Medium;
      font-weight: 500;
      text-align: left;
      color: #121c41;
    }
  }
}

.flex {
  width: 100%;
  display: flex;
  justify-content: space-between;
}

.font {
  font-size: 14px;
  font-family: PingFang SC, PingFang SC-Regular;
  font-weight: 400;
  text-align: left;
  color: #707582;
}

.text {
  color: #121c41;
  margin: 0 4px 0 8px;
}

.min-font {
  display: inline-block;
  font-size: 12px;
  transform: scale(0.86);
  color: #989fae;
}

.total {
  font-size: 13px;
  font-weight: 600;
}

.icon {
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: 10px;
}

.icon-question {
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
}

.red {
  color: #e30000;
  font-weight: 600;
}
</style>

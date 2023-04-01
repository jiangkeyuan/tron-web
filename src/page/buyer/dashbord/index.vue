<template>
  <div class="dashbord">
    <div class="dashbord-top-left">
      <div class="today-wrap">
        <div class="histogram"></div>
        <div class="today-wrap-right">
          <h5>今日租用</h5>
          <div class="today-wrap-right-num">
            {{ buyerObj.todayRentalEnergy || 0 }}
            <span class="today-wrap-right-text">能量</span>
          </div>
        </div>
      </div>
      <div class="divide-line"></div>
      <div class="today-wrap">
        <div class="histogram"></div>
        <div class="today-wrap-right">
          <h5>昨日租用</h5>
          <div class="today-wrap-right-num">
            {{ buyerObj.yesterRentalEenrgy || 0 }}
            <span class="today-wrap-right-text">能量</span>
          </div>
        </div>
      </div>
    </div>
    <div class="dashbord-top-right">
      <div class="dashbord-top-right-content">
        <h5 class="dashbord-top-right-content-top">账号可租量</h5>
        <div class="dashbord-top-right-content-num-kk">
          <span class="dashbord-top-right-content-num">{{ buyerObj.canRentalEnergy || 0 }}</span>
          能量
        </div>
        <div class="dashbord-top-right-content-button" @click="router.push('/buyer/recharge')">
          充值
        </div>
      </div>
      <div class="divide-lines"></div>
      <div class="dashbord-top-right-content">
        <h5 class="dashbord-top-right-content-top">API密钥</h5>
        <div class="dashbord-top-right-content-num-kk apikeys">
          <div>
            <span class="dashbord-top-right-content-num">{{ buyerObj.apiKeyCount || 0 }}</span>
            /3
          </div>
          <div @click="gotoApiKeys">设置</div>
        </div>
        <div class="dashbord-top-right-content-button" @click="creatAPI">
          创建KEY
        </div>
      </div>
    </div>
    <div class="dashbord-bottom-left">
      <div class="dashbord-bottom-left-header">API KEY</div>
      <div id="echarts" class="dashbord-bottom-left-content"></div>
    </div>
    <div class="dashbord-bottom-right">
      <div class="dashbord-bottom-right-title">帮助文档</div>
      <div class="dashbord-bottom-right-value">
        <HelpItems></HelpItems>
      </div>
    </div>
  </div>
</template>
<script setup>
import HelpItems from "../help/help-items.vue";
import * as echarts from "echarts";
import { useRouter } from "vue-router";
import { createAPIKEY } from "@/utils/utils/utils-ui.js";
import { bunyerIndex } from '@/utils/axios/buyer/index';
const router = useRouter();
const buyerObj = reactive({});

const gotoApiKeys = () => {
  router.push("/buyer/api-key");
};

const creatAPI = () => {
  createAPIKEY();
};

onMounted(async () => {
  const { data } = await bunyerIndex();
  const colors = ["#84c8b4", "#8488f7", "#5e98d6"];
  Object.assign(buyerObj, data);
  data.apiInfos = (data.apiInfos || []).map((v, i) => {
    if (v.apiKey.length > 6) {
      v.name = v.apiKey.substring(0, 6) + '...';
    } else {
      v.name = v.apiKey
    }
    v.value = v.rentalEnergy
    v.color = colors[i]
    return v;
  })
  var chartDom = document.getElementById("echarts");

  var myChart = echarts.init(chartDom);
  var option;

  option = {
    tooltip: {
      trigger: "item",
    },
    legend: {
      orient: "vertical",
      right: 10,
      top: "center",
      formatter: function (name) {
        // 添加
        let rentalEnergy = 0;
        let usedTrx;
        for (let i = 0; i < data.apiInfos.length; i++) {
          if (data.apiInfos[i].name === name) {
            rentalEnergy = data.apiInfos[i].rentalEnergy
            usedTrx = data.apiInfos[i].usedTrx
          }
        }
        var arr = [
          "{a|" + name + "}",
          "{b|" + rentalEnergy + " Energy}",
          "{c|" + usedTrx + " Trx}",
        ];
        return arr.join("  ");
      },
      ellipsis: true,
      textStyle: {
        // 添加
        height: 60,
        lineHeight: 60,
        outerHeight: 20,
        rich: {
          a: {
            fontSize: 15,
            width: 70,
            marginLeft: 10
          },
          b: {
            fontSize: 15,
            width: 150,
          },
          c: {
            fontSize: 15,
          },
        },
      },
    },
    series: [
      {
        // name: "serices0",
        type: "pie",
        radius: ["55%", "70%"],
        center: ["30%", "50%"],
        avoidLabelOverlap: false,
        label: {
          show: false,
          position: "center",
        },
        emphasis: {
          label: {
            show: false,
            fontSize: "20",
            fontWeight: "bold",
          },
        },
        labelLine: {
          show: false,
        },
        data: data.apiInfos,
      },
    ],
  };

  option && myChart.setOption(option);
});
</script>

<style scoped>
.apikeys {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  cursor: pointer;
}

.divide-lines {
  border-left: 1.5px #c8d0df dashed;
  height: 120px;
}

.divide-line {
  border-left: 1.5px rgba(255, 255, 255, 0.5) dashed;
  height: 120px;
}

.today-wrap-right-num {
  font-size: 22px;
}

.today-wrap-right-text {
  font-size: 14px;
}

.today-wrap-right {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: 74px;
  margin-left: 10px;
}

.today-wrap {
  display: flex;
  flex-direction: row;
  align-items: center;
}

.histogram {
  display: flex;
  align-items: flex-end;
  height: 74px;
}

.histogram::after {
  content: "";
  display: block;
  height: 100%;
  width: 21px;
  background: linear-gradient(0deg, #2a47ab, #f4f8ff);
  border-radius: 5px;
}

.histogram::before {
  content: "";
  display: block;
  margin-right: 5px;
  height: 50%;
  width: 21px;
  background: linear-gradient(0deg, #2a47ab, #f4f8ff);
  border-radius: 5px;
}

h5 {
  color: white;
}

.dashbord {
  display: flex;
  flex-direction: row;
  flex-flow: wrap;
}

.dashbord-top-left {
  width: 49.5%;
  height: 160px;
  background: #294aa5;
  color: white;
  border-radius: 5px;
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  align-items: center;
}

.dashbord-top-right {
  height: 160px;
  border-radius: 5px;
  width: 49.5%;
  background-color: #fff;
  border: 1px solid #c8d0df;
  box-sizing: border-box;
  margin-left: 1%;
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  align-items: center;
}

.dashbord-top-right-content {
  display: flex;
  flex-direction: column;
  width: 160px;
}

.dashbord-top-right-content-top {
  color: #121c41;
}

.dashbord-top-right-content-num {
  font-size: 22px;
  color: #2a47ab;
}

.dashbord-top-right-content-num-kk {
  margin: 5px 0;
}

.dashbord-top-right-content-button {
  border-color: #294aa5;
  background: #294aa5;
  text-shadow: 0 -1px 0 rgba(0, 0, 0, 0.12);
  box-shadow: 0 2px #0000000b;
  text-align: center;
  color: #fff;
  height: 24px;
  font-size: 14px;
  line-height: 24px;
  cursor: pointer;
}

.dashbord-bottom-right-value {
  padding-left: 24px;
}

.dashbord-top-right-content-button:hover {
  background: #294aa5;
  opacity: 0.8;
}

.dashbord-bottom-left {
  width: 49.5%;
  height: 444px;
  background: white;
  border: 1px solid #c8d0df;
  margin-top: 10px;
  border-radius: 5px;
}

.dashbord-bottom-right-title {
  display: inline-block;
  flex: 1;
  padding: 16px 0;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
  color: #000000d9;
  font-weight: 500;
  font-size: 16px;
  width: 100%;
  border-bottom: 1px solid #e5e7eb;
  padding-left: 24px;
  box-sizing: border-box;
}

.dashbord-bottom-right {
  height: 444px;
  border-radius: 5px;
  width: 49.5%;
  background-color: #fff;
  border: 1px solid #c8d0df;
  box-sizing: border-box;
  margin-left: 1%;
  margin-top: 10px;
}

.dashbord-bottom-left-header {
  padding: 0 24px;
  height: 57px;
  line-height: 57px;
  color: #000000d9;
  font-weight: 500;
  font-size: 16px;
}

.dashbord-bottom-left-content {
  padding: 24px;
  height: 340px;
}
</style>

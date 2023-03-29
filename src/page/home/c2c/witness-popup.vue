<template>
  <el-dialog
    v-model="props.show"
    title="投票领取 TRX 奖励"
    width="550px"
    center
    :before-close="handleClose"
    class="popup"
  >
    <div class="content">
      <div class="vote-info">
        <span>可投票数：{{ witnessObj.canVoteCount }}</span>
        <span>总投票数：{{ witnessObj.totalVote }}</span>
        
        {{canVoteCount}}
      </div>
      <span class="freeze-info">
        您冻结了 {{ witnessObj.totalVote }} TRX，获得了
        {{ witnessObj.canVoteCount }} 票
      </span>
      <ul class="infinite-list">
        <li
          v-for="(item, index) in witnessList"
          :key="index"
          class="infinite-list-item"
        >
          <div class="vote-type">
            <span>{{ index + 1 }}、{{ item.accountName || item.url }}</span>
            <span>年化收益率 {{ item.annualizedPercent }} %</span>
          </div>
          <div class="value">
            <span>{{ item.voteCount }} 票</span>
            <div class="input-value">
              <el-input
                v-model="item.vote_count"
                placeholder=""
                @blur="onBlur($event, item)"
                style="width: 90px"
              />
              <el-button type="primary" text="primary" @click="allVote(item)"
                >全部</el-button
              >
            </div>
          </div>
        </li>
      </ul>
    </div>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="handleClose" class="btn cancel">取消</el-button>
        <el-button type="primary" @click="handleSell" class="btn cancel">
          投票
        </el-button>
      </span>
    </template>
  </el-dialog>
</template>

<script setup>
import { getWitness } from '@/utils/axios/home/index.js'
import { ElMessage } from 'element-plus'
import { Search } from '@element-plus/icons-vue'
import { reactive } from 'vue'
const emit = defineEmits(['close'])
const props = defineProps({
  show: {
    type: Boolean
  }
})
const count = ref(0)
const address = ref('')
const witnessList = ref([])
const witnessObj = reactive({})
const canVoteCount = ref(0)
const handleChange = value => {
  console.log(value)
}
const handleClose = () => {
  emit('close')
}
const allVote = item => {
  const num = item.vote_count == '' ? 0 : item.vote_count
  const sum = canVoteCount.value - num
}
const onBlur = ($event, item) => {
    const num = item.vote_count == '' ? 0 : item.vote_count
    const sum = canVoteCount.value - num
}
const computeVoteCount = (current, canVoteCount) => {
  witnessList.value
}
const queryWitness = async () => {
  //   const data = await getWitness(address.value)
  //   const data = await getWitness('TVDJUVhQPdp8Gojsp7bmZS47M8KU2zSsaq')
  //   console.log('datadata',data);
  //   if(data.code != 12000) {
  //    return ElMessage.error(data.msg)
  //   }
  const data = {
    data: {
      fromAddress: 'TVDJUVhQPdp8Gojsp7bmZS47M8KU2zSsaq',
      canVoteCount: 100,
      totalVote: 20,
      witnessList: [
        {
          witnessAddress: 'TJmka325yjJKeFpQDwKSQAoNwEyNGhsaEV',
          accountName: '',
          url: 'http://sr-8.com',
          annualizedPercent: 0.0,
          voteCount: 324167418
        },
        {
          witnessAddress: 'TA4pHhHgobzSGH3CWPsZ5URNk3QkzUEggX',
          accountName: '',
          url: 'http://sr-6.com',
          annualizedPercent: 0.0,
          voteCount: 324287595
        },
        {
          witnessAddress: 'TQksq3erh9jFweRaqqhgrZ1pFQY96JfNYH',
          accountName: '',
          url: 'http://sr-13.com',
          annualizedPercent: 0.0,
          voteCount: 324172597
        },
        {
          witnessAddress: 'TBW2Zid35siEU8tWNmhgnJdKghYPLLi8bg',
          accountName: '',
          url: 'http://sr-10.com',
          annualizedPercent: 0.0,
          voteCount: 324166974
        },
        {
          witnessAddress: 'TQuzjxWcqHSh1xDUw4wmMFmCcLjz4wSCBp',
          accountName: '',
          url: 'http://sr-3.com',
          annualizedPercent: 0.0,
          voteCount: 324168922
        },
        {
          witnessAddress: 'TGZw4WhCYJ93a2Lo2pc2vhdAarJTp15GqV',
          accountName: '',
          url: 'http://sr-11.com',
          annualizedPercent: 0.0,
          voteCount: 324166972
        },
        {
          witnessAddress: 'TW1S82zo84JTbAeK8EWevEkb38Fujgo1ZY',
          accountName: '',
          url: 'http://sr-17.com',
          annualizedPercent: 0.0,
          voteCount: 324173994
        },
        {
          witnessAddress: 'TPffmvjxEcvZefQqS7QYvL1Der3uiguikE',
          accountName: '',
          url: 'http://sr-26.com',
          annualizedPercent: 0.0,
          voteCount: 324821701
        },
        {
          witnessAddress: 'TW6EhcGvjGjPfDR8Y3bHwp3dLf1NzDHcC2',
          accountName: '',
          url: 'http://sr-18.com',
          annualizedPercent: 0.0,
          voteCount: 324172684
        },
        {
          witnessAddress: 'TEp1ru7opCexkbFM9ChK6DFfL2XFSfUo2N',
          accountName: '',
          url: 'http://sr-1.com',
          annualizedPercent: 0.0,
          voteCount: 325870178
        }
      ]
    }
  }
  witnessList.value = data.data.witnessList.map(item => {
    return {
      ...item,
      vote_count: ''
    }
  })

  canVoteCount.value = data.data.canVoteCount
  Object.assign(witnessObj, data.data)
  //   Object.assign
}
onMounted(() => {
  console.log('66666666666666666666666666666666666666666')
})
address.value = window.tronWeb?.defaultAddress?.base58
queryWitness()
</script>

<style lang="less" scoped>
.popup {
  .content {
    .vote-info {
      display: flex;
      flex-direction: column;
      background-color: #f6f6f6;
      padding: 15px 30px;
    }
    .freeze-info {
      display: inline-block;
      color: #2d78cd;
      margin: 20px 0;
    }
    .infinite-list {
      height: 40vh;
      padding: 0;
      margin: 0;
      list-style: none;
      background-color: #f6f6f6;
      overflow-y: scroll;
    }
    .infinite-list .infinite-list-item {
      padding: 10px 20px;
      color: var(--el-color-primary);
      border-bottom: 1px solid #f0f0f0;
      display: flex;
      align-items: center;
      justify-content: space-between;
      color: #000000d9;
      .vote-type {
        display: flex;
        flex-direction: column;
        span {
          margin: 5px 0;
          &:nth-child(2) {
            margin-left: 28px;
          }
        }
      }
      .value {
        display: flex;
        flex-direction: column;
        align-items: flex-end;
        flex: 1;
        .input-value {
          display: flex;
          align-items: center;
          justify-content: flex-end;
        }
      }
    }
    .infinite-list .infinite-list-item + .list-item {
      margin-top: 10px;
    }
  }
  .dialog-footer {
    width: 100%;
    margin-top: 20px;
    display: flex;
    justify-content: space-between;
    .btn {
      width: 47%;
      border-radius: 6px;
      padding: 20px 0;
      display: flex;
      justify-content: center;
      align-items: center;
    }
  }
}
</style>

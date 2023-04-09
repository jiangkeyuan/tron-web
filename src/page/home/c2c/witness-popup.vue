<template>
  <el-dialog
    v-model="props.show"
    title="投票领取 TRX 奖励"
    width="550px"
    center
    :before-close="handleClose"
    @open="open"
    class="popup"
  >
    <div class="content">
      <div class="vote-info">
        <span>可投票数：{{ witnessObj.canVoteCount }}</span>
        <span>总投票数：{{ witnessObj.totalVote }}</span>
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
        <el-button
          type="primary"
          @click="() => handleSell()"
          class="btn cancel"
          :loading="loading"
        >
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
import { awaitFnLoading } from '@/utils/utils/loading.js'
import {
  transactionBuilder,
  sendSignRawTransaction,
  walletAddress
} from '@/utils/utils/tron.js'
const emit = defineEmits(['close'])
const props = defineProps({
  show: {
    type: Boolean
  }
})
const count = ref(0)
const address = ref(walletAddress())
const witnessList = ref([])
const witnessObj = reactive({})
const canVoteCount = ref(0)
const loading = ref(false)
const handleSell = async () => {
  let value = {}
  witnessList.value.map(v => {
    if (!!v.vote_count) {
      value[v.witnessAddress] = +v.vote_count
    }
  })
  console.log(value)
  try {
    loading.value = true
    const data = await transactionBuilder(value)
    const v = await sendSignRawTransaction(data)
    console.log(v)
    loading.value = false
    if (v.result) {
      ElMessage.success('投票成功')
      handleClose()
    } else {
      ElMessage.error('投票失败')
    }
  } catch (error) {
    console.error(error)
    loading.value = false
    if (JSON.stringify(error).includes('Invalid votes provided')) {
      return ElMessage.error('请选择一个投票，并填写票数!')
    }
    ElMessage.error(error)
  }
}
const handleChange = value => {
  console.log(value)
}
const handleClose = () => {
  witnessList.value = witnessList.value.map(item => {
    return {
      ...item,
      vote_count: ''
    }
  })
  emit('close')
}
const allVote = item => {
  item.vote_count =
    witnessObj.canVoteCount - computeVoteCount(false, item.witnessAddress)
}
const onBlur = ($event, item) => {
  if (!item.vote_count) {
    item.vote_count = 0
    return
  }
  if (computeVoteCount(true) > witnessObj.canVoteCount) {
    item.vote_count =
      witnessObj.canVoteCount - computeVoteCount(false, item.witnessAddress)
  }
}
const computeVoteCount = (isAll, adress) => {
  let value = 0
  if (isAll) {
    witnessList.value.map(v => {
      if (v.vote_count) {
        value += +v.vote_count
      }
    })
  } else {
    witnessList.value.map(v => {
      if (v.vote_count && v.witnessAddress !== adress) {
        value += +v.vote_count
      }
    })
  }

  return value
}
const queryWitness = async () => {
  const data = await awaitFnLoading(getWitness, {
    target: document.querySelector('.infinite-list')
  })(address.value)
  console.log('datadata', data)
  if (data.code != 12000) {
    return ElMessage.error(data.msg)
  }
  witnessList.value = data.data.witnessList.map(item => {
    return {
      ...item,
      vote_count: ''
    }
  })

  canVoteCount.value = data.data.canVoteCount
  Object.assign(witnessObj, data.data)
}
const open = () => {
    address.value = walletAddress() || ''
    walletAddress() && queryWitness()
}
onMounted(() => {
  console.log('66666666666666666666666666666666666666666')
})
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
      overflow-y: auto;
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

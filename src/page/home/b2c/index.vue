<template>
  <div class="b2c-container">
    <div class="b2c-content">
      <div class="rental-container-v2 rental">
        <div class="rental-about">
          <h1>快捷交易 - 能量秒到账</h1>
          <div class="introduce">
            <ul>
              <li>租期更长，最长30天</li>
              <li>范围更大，1万起租</li>
              <li>支持多币种支付购买</li>
              <li>支持DAPP支付和转账租赁</li>
              <li>
                <span>如一次性需大额能量，可</span>
                <a class="customer-link" href="/" target="_blank">联系客服</a>
                <span> 下单 </span>
              </li>
            </ul>
            <img src="@/assets/home/introduce.png" alt="" />
          </div>
          <div class="info">
            <div>剩余可租能量：<span>966,484</span>energy</div>
            <div>未来2小时内增加：<span>75,854,513</span>energy</div>
            <div>单笔最大可租：<span>355,343</span>energy</div>
          </div>
          <img
            src="@/assets/home/swap-bg-spaceman.webp"
            alt=""
            class="spaceman-img"
          />
        </div>
        <div class="rental-operation">
          <div class="header">
            <div class="title">转账租赁</div>
            <el-radio-group v-model="radio2">
              <el-radio-button label="1" border>转账租凭</el-radio-button>
              <el-radio-button label="2" border>DAPP租赁</el-radio-button>
            </el-radio-group>
          </div>
          <div class="project-panel">
            <div class="input-panel rentVal">
              <div class="title">租用量（单笔1~138.5908万）</div>
              <div class="input">
                <el-input
                  v-model="input"
                  clearable
                  placeholder="请输入需要租用的数量"
                  min="10000"
                  max="1408730"
                  suffix-icon="Search"
                  :formatter="onFormatter"
                  :parser="onParser"
                />
              </div>
              <div class="rent-value-shortcut">
                <div class="item">50万</div>
                <div class="item">100万</div>
                <div class="item">500万</div>
                <div class="item">1000万</div>
                <div class="item">最大</div>
              </div>
            </div>
            <div class="notice noticepc"></div>
            <div class="input-panel rentDay">
              <div class="title">租用天数默认为3天</div>
            </div>
            <div class="announcements">
              <div>1、转账租赁最小支持金额5.25TRX/0.33USDT</div>
              <div>2、若转账大于可租能量，将扣除1%手续费后原路退回</div>
              <div>
                3、平台默认转账钱包为接收能量地址，若需自定义接收地址，请在转账时备注接收地址
                <span class="example-title">示例教程</span>
              </div>
            </div>
          </div>
          <div class="pay-panel">
            <div class="header">
              <div class="title">支付</div>
            </div>
            <div class="cashier">
              <div class="address">
                <div class="address-title">平台地址：</div>
                <div class="copy-board">
                  <span class="copy-btn-wrapper">
                    <div class="btn">
                      <span>TALy13AV6qCj5UmYwn1vUYHxGPBBWAAAAA</span>
                      <i class="icon"></i>
                    </div>
                  </span>
                </div>
              </div>
              <div class="amount-box">
                <div class="amount-content">
                  <div class="amount">
                    <span>需转账金额</span>
                    <span>
                      <em>443.430540</em>
                      TRX
                    </span>
                  </div>
                  <div class="info">
                    <div>
                      价格/天：
                      <span>105</span>
                      sun,
                    </div>
                    <div>
                      较3天烧毁省
                      <span>75</span>
                      % ≈
                      <span>1330.29TRX</span>
                    </div>
                  </div>
                </div>
                <img
                  src="@/assets/home/content-qr-code.png"
                  alt="二维码加载失败，请检查网络后刷新重试"
                  class="content-qr-code"
                />
              </div>
            </div>
          </div>
          <div class="footer">
            <el-button color="#294aa5" class="btn-block">复制金额，去转账</el-button>
          </div>
        </div>
      </div>
      <div class="statistics-content stc-display">
        <div class="item">
          <div class="num">
            <div class="container num">
              <div>1,749,045,738</div>
            </div>
          </div>
          <div class="info">平台总能量</div>
        </div>
        <div class="item">
          <div class="num">
            <div class="container num">
              <div>48,398,862,613</div>
            </div>
          </div>
          <div class="info">累计为用户提供能量</div>
        </div>
        <div class="item">
          <div class="num">
            <div class="container num">
              <div>9,676,190.026</div>
            </div>
          </div>
          <div class="info">累计为用户节省TRX</div>
        </div>
        <div class="item">
          <div class="num">
            <div class="container num">
              <div>105</div>
            </div>
          </div>
          <div class="info">当前单价(sun) <i class="img">1</i></div>
          <div class="rule">5万能量以上</div>
        </div>
      </div>
      <div class="rent-log-container">
        <div class="rent-log-panel">
          <div class="rent-log-title">
            <div class="switch-panel">
              <el-radio-group v-model="radio2">
                <el-radio-button label="1" border>大家在租</el-radio-button>
                <el-radio-button label="2" border>我的租用</el-radio-button>
              </el-radio-group>
            </div>
          </div>
          <div class="table">
            <el-table
              :data="tableData"
              :row-class-name="tableRowClassName"
              style="width: 100%"
            >
              <el-table-column prop="date" label="交易哈希" />
              <el-table-column prop="name" label="租用地址" width="280" />
              <el-table-column prop="address" label="租用资源" />
              <el-table-column prop="address" label="租用时长" />
              <el-table-column prop="address" label="日期" />
            </el-table>
          </div>
        </div>
      </div>
    </div>
    <api-box class="api"></api-box>
  </div>
</template>

<script setup>
import { Calendar, Search } from '@element-plus/icons-vue'
const radio2 = ref('1')
const input = ref('')
const tableData = [
  {
    date: '2016-05-03',
    name: 'Tom',
    address: 'No. 189, Grove St, Los Angeles'
  },
  {
    date: '2016-05-02',
    name: 'Tom',
    address: 'No. 189, Grove St, Los Angeles'
  },
  {
    date: '2016-05-04',
    name: 'Tom',
    address: 'No. 189, Grove St, Los Angeles'
  },
  {
    date: '2016-05-01',
    name: 'Tom',
    address: 'No. 189, Grove St, Los Angeles'
  }
]
const tableRowClassName = ({ row, rowIndex }) => {
  if (rowIndex % 2 == 0) {
    return 'warning-row'
  }
  return 'success-row'
}
const onFormatter = value => {
  return `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')
}
const onParser = value => {
  return value.replace(/\$\s?|(,*)/g, '')
}
</script>

<style lang="less" scoped>
.b2c-container {
  --bg-primary-color: #121d44;
  --bg-secondary-color: #15244f;
  --bg-lesser-color: #202b54;
  --text-primary-color: #fff;
  --text--secondary-color: #7f8fc8;
  --text-lesser-color: #ced9eb;
  --text-table-body-color: #6f8eca;
  --text-notice-color: #7f8fc8;
  --border-primary-color: #2a47ab;
  --border-radio-color: #2a47ab;
  --border-dashed-color: #2b396a;
  --input-suffix-color: #266ef1;
  --input-shortcut-color: #26a17b;
  display: flex;
  flex-direction: column;
  justify-content: center;
  background-color: var(--bg-primary-color);
  background-image: url('@/assets/home/swap-bg.webp'),
    url('@/assets/home/swap-bg-star.png');
  background-size: cover, 100px;
  background-repeat: no-repeat;
  background-attachment: fixed;
  background-position: left top, 95% 70%;
}
.b2c-content {
  max-width: 1300px;
  width: 100%;
  margin: 0px auto;
  position: relative;
}
.rental-container-v2 {
  position: relative;
  display: flex;
  justify-content: space-between;
  padding: 38px 100px 0px;
  .rental-about {
    position: relative;
    flex: 1 1 0%;
    min-width: 280px;
    max-width: 400px;
    margin-right: 40px;
    padding-top: 30px;
    h1 {
      margin-bottom: 34px;
      font-size: 30px;
      color: var(--text-primary-color);
    }
    .introduce {
      position: relative;
      margin-top: 40px;
      ul {
        padding-left: 20px;
        list-style: initial;
        line-height: 1.8em;
        color: var(--text-lesser-color);
        font-size: 16px;
      }
      img {
        width: 40px;
        height: 40px;
        position: absolute;
        right: 0px;
        bottom: 0px;
      }
    }
    .info {
      margin-top: 50px;
      padding: 20px;
      border: 1px dashed rgb(53, 90, 160);
      border-radius: 6px;
      background-color: rgb(39, 55, 103);
      color: var(--text-lesser-color);
      div {
        margin-bottom: 10px;
        &:last-child {
          margin: 0px;
        }
      }
    }
    .spaceman-img {
      width: 120%;
      margin: 120px -50px 0px;
    }
  }
  .rental-operation {
    padding: 30px;
    border: 1px solid var(--border-primary-color);
    border-radius: 25px;
    max-width: 590px;
    min-width: 570px;
    width: 590px;
    height: 100%;
    background-color: var(--bg-primary-color);
    color: var(--text-primary-color);
    .header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 30px;
      .title {
        font-size: 30px;
      }
    }
    .project-panel {
      .input-panel {
        padding: 20px 20px 15px;
        border-radius: 6px;
        background-color: var(--bg-lesser-color);
        .title {
          display: flex;
          justify-content: space-between;
        }
        .input {
          margin: 25px -10px 0;
          position: relative;
        }
      }
      .rentDay {
        padding: 20px;
      }
      .announcements {
        margin-top: 15px;
        font-size: 14px;
        color: var(--text--secondary-color);
        line-height: 1.4em;
        .example-title {
          color: #266ef1;
        }
      }
      .notice {
        color: var(--text-notice-color);
        margin: 15px 0;
      }
    }
    .pay-panel {
      margin-top: 15px;
      padding: 20px;
      border: 1px dashed var(--border-dashed-color);
      border-radius: 6px;
      .header {
        display: flex;
        justify-content: space-between;
        margin-bottom: 0;
        .title {
          font-size: 16px;
        }
      }
      .cashier {
        .address {
          margin-top: 6px;
          font-size: 12px;
          color: var(--text--secondary-color);
          .address-title {
            display: inline;
          }
          .copy-board {
            display: inline;
            margin-top: 8px;
            span {
              margin-right: 8px;
              cursor: pointer;
            }
            .copy-btn-wrapper .icon {
              font-size: 16px;
            }
          }
        }
        .amount-box {
          display: flex;
          .amount-content {
            flex: 1;
            .amount {
              display: flex;
              justify-content: space-between;
              align-items: center;
              margin-top: 20px;
              padding: 0 15px;
              border-radius: 6px;
              height: 50px;
              background-color: var(--bg-lesser-color);
              color: var(--text--secondary-color);
              em {
                margin-right: 5px;
                color: var(--text-primary-color);
                font-size: 20px;
                font-style: normal;
              }
            }
          }
          .content-qr-code {
            margin-top: -20px;
            margin-left: 20px;
            width: 90px;
            height: 90px;
          }
        }
        .info {
          margin-top: 15px;
          color: #26a17b;
          font-size: 14px;
          div {
            display: inline-block;
            margin-right: 5px;
          }
        }
      }
    }
    .footer {
      margin-top: 20px;
      .btn-block {
        height: 55px;
        border-radius: 6px;
        font-weight: 700;
        width: 100%;
      }
    }
  }
  .rent-value-shortcut {
    margin-top: 15px;
    display: flex;
    .item {
      margin-right: 8px;
      border: 1px solid var(--input-shortcut-color);
      border-radius: 3px;
      padding: 5px 15px;
      font-size: 12px;
      color: var(--input-shortcut-color);
      transition: all 0.5s ease-in-out;
      cursor: pointer;
    }
  }
}
.statistics-content {
  margin-top: 70px;
  display: flex;
  align-items: center;
  box-shadow: 0 0 10px #0000001a;
  background-color: #18295c;
  color: #fff;
  width: 100%;
  height: 150px;
  .item {
    flex: 1;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: center;
    width: 100%;
    height: 70px;
    border-right: 1.5px solid #21346c;
    .num {
      font-size: 30px;
      font-weight: 700;
    }
    .info {
      display: flex;
      align-items: center;
      line-height: 1.4em;
      font-size: 1rem;
      color: #566897;
    }
    .rule {
      font-size: 14px;
      line-height: 1.4em;
      color: #566897;
    }
  }
}
.rent-log-container {
  text-align: center;
  margin: 50px 0;
  .rent-log-title {
    margin-bottom: 30px;
  }
  .table {
    :deep(.el-table) {
      color: #6f8eca;
      .warning-row {
        background-color: #121d44;
      }
      .success-row {
        background-color: #15244f;
      }
      td.el-table__cell,
      th.el-table__cell.is-leaf {
        border: 0;
      }
      th.el-table__cell {
        background-color: #18295c;
      }
      thead {
        color: #fff;
      }
      .el-table__inner-wrapper {
        &::before {
          background-color: transparent;
        }
      }
      tbody tr:hover > td {
        background-color: #273767;
      }
    }
  }
}
.switch-panel {
  display: inline-flex;
  height: 40px;
  // border: 1px solid #2a47ab;
  border-radius: 20px;
  box-shadow: 0 0 10px #0000001a;
  padding: 1px;
}
.api {
  margin: 30px auto;
  :deep(.title) {
    color: #fff;
  }
}
.copy-btn-wrapper {
  display: inline-block;
  color: inherit;
  .btn {
    display: flex;
    align-items: center;
    color: inherit;
    cursor: pointer;
  }
}
</style>

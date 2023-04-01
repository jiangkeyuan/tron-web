<template>
  <div class="guide">
    <div class="page-wrapper-content">
      <div class="guide-1-step" v-if="step == 1">
        <img src="@/assets//home//01-bg.png" alt="" class="bg" />
        <div class="text-wrapper">
          <div class="main">
            <h3>快速出售设置教程</h3>
            <p>
              为了更高效的自动化出售能量，获取更高的收益（每笔订单可赚取75%的收入），现在快来和我一起学习设置吧！
            </p>
            <div class="star-learn-btn" @click="startStudy">开始学习</div>
          </div>
        </div>
      </div>
      <div class="guide-2-step" v-if="step == 2">
        <img src="@/assets//home//02-bg.png" alt="" />
        <div class="text-wrapper">
          <div class="main">
            <h3>自动出售授权教程</h3>
            <div class="copy-item">
              <p class="title">授权权限名称</p>
              <p class="text">feee.io</p>
              <div class="btn" @click="copyEnd('feee.io')">复制</div>
            </div>
            <div class="copy-item">
              <p class="title">授权地址</p>
              <p class="text">TQcC5yWBCuqo9pXkskHJMdsfBwZJLhhhhh</p>
              <div
                class="btn"
                @click="copyEnd('TQcC5yWBCuqo9pXkskHJMdsfBwZJLhhhhh')"
              >
                复制
              </div>
            </div>
            <p>第一步：查看授权教程，设置授权！</p>
            <div class="btns">
              <div class="btn" @click="lookVideoCourse">查看教程</div>
              <div class="btn link" @click="lookTxtCourse">查看图文教程</div>
            </div>
            <p>第二步：提交已设置授权的钱包地址，完成授权</p>
            <el-form :model="form" label-width="0px">
              <el-form-item label="">
                <el-input v-model="form.name" disabled />
              </el-form-item>
              <el-form-item label="">
                <el-checkbox label="立即开启自动出售" v-model="form.delivery" />
              </el-form-item>
              <el-form-item>
                <el-button style="width: 100%" type="primary" @click="onSubmit"
                  >完成授权</el-button
                >
              </el-form-item>
            </el-form>
          </div>
        </div>
      </div>
    </div>
  </div>
  <el-dialog
    v-model="courseVisible"
    title="如何授权给Feee.io自动出售能量？"
    width="830px"
    center
  >
    <HowAutoSell></HowAutoSell>
  </el-dialog>
  <el-dialog
    v-model="courseVideoVisible"
    :show-close="false"
    title=""
    :before-close="close"
    width="830px"
    center
    style="background-color: transparent"
  >
    <div class="video-course-wrapper">
      <video
        class="video"
        :src="videoSrc"
        autoplay=""
        controls=""
        preload="auto"
      ></video>
      <div class="btns">
        <div class="btn" @click="lookTxtCourse">图文教程</div>
        <div class="btn" @click="close">完成</div>
      </div>
    </div>
  </el-dialog>
</template>

<script setup>
import { getPermission } from '@/utils/axios/seller/index.js'
import { copy } from '@/utils/utils/index.js'
import { ref } from 'vue'
import HowAutoSell from '../help/how-auto-sell/page.vue'
import { useRouter } from "vue-router";
const router = useRouter();
const form = reactive({
  name: 'THdgueo2XA3LyTbfrVPPQ4XzHuyNz8K73P',
  delivery: true
})
const courseVisible = ref(false)
const courseVideoVisible = ref(false)
const videoSrc = ref('')
const step = ref(1)
const copyEnd = msg => {
  copy({
    msg,
    callback: () => {
      ElMessage.success('复制成功')
    }
  })
}
const onSubmit = async () => {
  console.log('submit!')
  const data = await getPermission()
    console.log(data)
  if (data.code === 12000) {
    console.log('666666666');
    router.push('/console/seller/auth-operation')
  } else {
    ElMessage.error(data.msg)
  }
}
const startStudy = () => {
  step.value = 2
}
const lookTxtCourse = () => {
  courseVideoVisible.value = false
  courseVisible.value = true
}
const lookVideoCourse = () => {
  videoSrc.value = 'https://file.feee.io/tutorial/authorized.mp4'
  courseVisible.value = false
  courseVideoVisible.value = true
}
const close = () => {
  courseVideoVisible.value = false
  videoSrc.value = ''
}
</script>

<style lang="less" scoped>
.guide {
  .guide-1-step {
    position: relative;
    .bg {
      display: block;
      max-width: 100%;
      height: auto;
      border-style: none;
    }
    .text-wrapper {
      position: absolute;
      top: 29%;
      right: 11%;
      width: 493px;
      height: 245px;
      background: url('@/assets/home/01-text.png') no-repeat center / cover;
      overflow: hidden;
      .main {
        position: absolute;
        top: 15px;
        right: 50px;
        bottom: 15px;
        left: 120px;
        h3 {
          margin: 15px 0;
          text-align: center;
          font-size: 18px;
          color: #121c41;
        }
      }
      p {
        font-size: 16px;
        color: #707582;
      }
      .star-learn-btn {
        display: flex;
        justify-content: center;
        align-items: center;
        margin: 20px auto 0;
        width: 160px;
        height: 40px;
        background-color: #294aa5;
        border-radius: 5px;
        font-size: 16px;
        color: #fff;
        cursor: pointer;
      }
    }
  }
  .guide-2-step {
    position: relative;
    img {
      display: block;
      max-width: 100%;
      height: auto;
    }

    .text-wrapper {
      position: absolute;
      top: 40%;
      left: 50%;
      width: 513px;
      height: 398px;
      transform: translate(-50%, -50%);
      background: url('@/assets/home/02-text.png') no-repeat center / cover;
      .main {
        position: absolute;
        top: 0;
        right: -30px;
        left: 148px;
        padding: 20px;
        border-radius: 10px;
        background-color: #fff;
        p {
          margin: 15px 0;
          font-size: 16px;
          color: #707582;
        }
        h3 {
          margin: 15px 0;
          text-align: center;
          font-size: 18px;
          color: #121c41;
        }
        .copy-item {
          display: grid;
          grid-template-areas:
            'title title'
            'text btn';
          grid-template-columns: 1fr auto;
          -moz-column-gap: 10px;
          column-gap: 10px;
          align-items: center;
          margin-bottom: 10px;
          .title {
            grid-area: title;
            font-size: 14px;
            color: #9297a6;
            margin: 0;
            overflow: hidden;
            white-space: nowrap;
            text-overflow: ellipsis;
          }
          .text {
            grid-area: text;
            flex: 1;
            margin: 0;
            overflow: hidden;
            white-space: nowrap;
            text-overflow: ellipsis;
            font-size: 14px;
          }
          .btn {
            grid-area: btn;
            width: 50px;
            height: 30px;
            font-size: 14px;
            flex: 1;
            display: flex;
            justify-content: center;
            align-items: center;
            background-color: #294aa5;
            border-radius: 5px;
            color: #fff;
            cursor: pointer;
          }
        }
        .btns {
          display: flex;
          margin-top: 15px;
          .btn {
            flex: 1;
            display: flex;
            justify-content: center;
            align-items: center;
            height: 40px;
            background-color: #294aa5;
            border-radius: 5px;
            color: #fff;
            font-size: 16px;
            cursor: pointer;
            &:not(:last-of-type) {
              margin-right: 10px;
            }
          }
          .link {
            background-color: transparent;
            color: #294aa5;
          }
        }
      }
    }
  }
}
</style>
<style lang="less">
.video-course-wrapper {
  .video {
    margin: 0 auto;
  }
  .btns {
    display: flex;
    justify-content: space-around;
    margin-top: 20px;
    .btn {
      display: flex;
      justify-content: center;
      align-items: center;
      width: 140px;
      height: 40px;
      background-color: #294aa5;
      border-radius: 5px;
      color: #fff;
      font-size: 16px;
      cursor: pointer;
    }
  }
}
</style>

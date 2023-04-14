<template>
  <HelpContent class="text-course-wrapper">
    <p>只需几步轻松设置</p>
    <p>
      1、首先，打开波场浏览器
      <a href="https://tronscan.org" target="_blank">tronscan</a>
    </p>
    <img
      src="@/assets/help/cas-1.png"
      :zoom-rate="1.2"
      :initial-index="4"
      fit="cover"
    />
    <p>2、点击连接钱包</p>
    <img
      src="@/assets/help/cas-2.png"
      :zoom-rate="1.2"
      :initial-index="4"
      fit="cover"
    />
    <p>3、连接成功后，点击钱包地址</p>
    <img
      src="@/assets/help/cas-3.png"
      :zoom-rate="1.2"
      :initial-index="4"
      fit="cover"
    />
    <p>4、点击进入账户</p>
    <img
      src="@/assets/help/cas-4.png"
      :zoom-rate="1.2"
      :initial-index="4"
      fit="cover"
    />
    <p>5、点击编辑权限</p>
    <img
      src="@/assets/help/cas-5.png"
      :zoom-rate="1.2"
      :initial-index="4"
      fit="cover"
    />
    <p>6、点击添加新权限</p>
    <img
      src="@/assets/help/cas-6.png"
      :zoom-rate="1.2"
      :initial-index="4"
      fit="cover"
    />
    <p>7、权限名称必须输入HashGo</p>
    <img
      src="@/assets/help/cas-7.png"
      :zoom-rate="1.2"
      :initial-index="4"
      fit="cover"
    />
    <p>8、阈值填写1</p>
    <img
      src="@/assets/help/cas-8.png"
      :zoom-rate="1.2"
      :initial-index="4"
      fit="cover"
    />
    <p>9、输入平台钱包地址<mark>TQcC5yWBCuqo9pXkskHJMdsfBwZJLhhhhh</mark></p>
    <img
      src="@/assets/help/cas-9.png"
      :zoom-rate="1.2"
      :initial-index="4"
      fit="cover"
    />
    <p>10、权重填写1s</p>
    <img
      src="@/assets/help/cas-10.png"
      :zoom-rate="1.2"
      :initial-index="4"
      fit="cover"
    />
    <p>11、点击添加操作</p>
    <img
      src="@/assets/help/cas-11.png"
      :zoom-rate="1.2"
      :initial-index="4"
      fit="cover"
    />
    <p>
      12、在编辑权限弹窗中勾选这4项（TRX
      Freeze是质押权限，授权平台后可自动化出售能量或带宽、TRX
      Unfreeze是解押权限，授权后平台自动解冻质押订单、
      授权投票权限，可在出售成功后自动投票，获取TRX权益奖励、 Reward
      Withdraw是领取权益权限，授权后平台会自动领取权益收益到您的钱包）
    </p>
    <img
      src="@/assets/help/cas-12.png"
      :zoom-rate="1.2"
      :initial-index="4"
      fit="cover"
    />
    <p>13、点击保存</p>
    <img
      src="@/assets/help/cas-13.png"
      :zoom-rate="1.2"
      :initial-index="4"
      fit="cover"
    />
    <p>14、保存成功后，我们会看到新添加的授权权限</p>
    <img
      src="@/assets/help/cas-14.png"
      :zoom-rate="1.2"
      :initial-index="4"
      fit="cover"
    />
    <p>15、再点击右上方的保存按钮</p>
    <img
      src="@/assets/help/cas-15.png"
      :zoom-rate="1.2"
      :initial-index="4"
      fit="cover"
    />
    <p>16、波场会收取100TRX的费用</p>
    <img
      src="@/assets/help/cas-16.png"
      :zoom-rate="1.2"
      :initial-index="4"
      fit="cover"
    />
    <p>
      17、支付成功后，回到卖家后台
      <a
        href="https://feee.io/console"
        target="_blank"
        rel="noopener noreferrer"
        >HashGo</a
      >，填写已设置授权的钱包地址并提交完成授权，到此授权的全部操作就完成了。
    </p>
    <img
      src="@/assets/help/cas-17-1.png"
      :zoom-rate="1.2"
      :initial-index="4"
      fit="cover"
    />
    <img
      src="@/assets/help/cas-17-2.png"
      :zoom-rate="1.2"
      :initial-index="4"
      fit="cover"
    />
  </HelpContent>
</template>

<script setup>
import HelpContent from '../help-content.vue'
</script>

<style lang="less" scoped>
.text-course-wrapper {
  overflow: hidden;
  img {
    width: 100%;
  }
  p {
    margin: 10px 0;
    font-size: 16px;
  }
  a {
    text-decoration: underline;
    &::after {
      content: ' (' attr(href) ') ';
    }
  }
}
</style>

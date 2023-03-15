const detail = {
  q1: {
    title: '什么是能量？能量是免费的吗？',
    content: `
        <p>TRON网络中的资源有3种:带宽,能量,存储。得益于波场独有的设计模型,TRON网络中的存储资源几乎是无限的。</p>
        <p>我们在比特币、以太坊上转账时需要通过 BTC、ETH 来支付手续费。在波场进行转账时消耗的是带宽和能量。</p>
        <p>BTC、ETH 和 TRX 都是主网币,而基于这些主网创建的代币相当于租住在主网币房东的家里,缴纳手续费的方式是由主网这个房东决定的。</p>
        <p>比特币和以太坊立下的规矩是,代币转账需要用 BTC 和 ETH 来支付,而波场立下的规矩则是用能量和带宽来支付。</p>
        <p>波场上有两类常见租客(两类常见的代币格式):TRC-10 和 TRC-20。转账 TRX 和 TRC-10 代币时需要消耗带宽,转账 TRC-20 代币时需要消耗带宽和能量。</p>
        <p>如果你不知道代币格式,可以在资产首页点击该代币,进入交易记录界面后再点击右上角,进入 TRONSCAN 即可查看其代币格式,例如波场上的 USDT 就是 TRC-20 格式。</p>
        <p>波场账户能量不是免费的,需要冻结TRX获取能量。也可以向Feee.io能量交易平台租能量。假如账户中有100万能量,使用完毕后,会慢慢恢复,24小时恢复满100万。冻结(租用)默认最少3天, 当3天后账户取消冻结(租用到期)时,通过冻结(租用)获得的能量也将自动清零。</p>
        `
  },
  q2: {
    title: '能量有什么用？',
    content: `
        <p>能量主要可在以下几种场景用于消耗(以下消耗数据为链上数据概揽,为大概数据,实际准确消耗数据需操作之后区块浏览器查询所得数据。</p>
        <p>TRC20 消耗</p>
        <p>TRC20代币,消耗带宽和能量,例如USDT是20代币,转账一笔需消耗28031能量和345带宽,需要抵扣能量7.8TRX和带宽0.345TRX左右。</p>
        <p>智能合约 消耗</p>
        <p>调用智能合约,需消耗带宽和能量。例如SUNSWAP买卖交易,均是智能合约交互,需消耗账户中的能量和带宽。</p>
        <p>TRC20 部署</p>
        <p>标准合约部署需消耗58万能量,约抵扣150TRX,非标准代币合约部署需消耗几十至上百万能量不等。</p>
        <p>TRC721 部署</p>
        <p>部署波场NFT(TRC721协议),需消耗带宽10610和能量167万,抵扣10.61TRX和471TRX费用。</p>
        `
  },
  q3: {
    title: '什么是能量？能量是免费的吗？',
    content: `
        
    <p>如果你想获得能量,有三种方法。</p>
    <p>方法一:燃烧 TRX</p>
    <p>如果账号没有足够能量,转账时会自动燃烧 TRX 以抵扣转账所需的带宽和能量。相比消耗能量,燃烧TRX显然并不划算。</p>
    <p>方法二:冻结 TRX</p>
    <p>点击资产首页的能量 / 带宽,进入 Tron 资源管理界面,选择想获得的资源类型,输入需冻结的 TRX 数量,获得的能量 = 冻结的TRX / 全网获得能量冻结的总TRX * 总能量限制。(这是基于冻结的TRX为所有用户平均分配的固定能量),冻结后的 TRX 在 3 天后可以解冻取回。如果您有大量闲置TRX,可以考虑这种方法。</p>
    <img src="/src/assets/home/faq3answer1.png" alt="" >
    <p>方法三:租用能量</p>
    <p>可以通过Feee.io平台进行能量租赁的方式来节省手续费,能量租赁既不需要冻结大量TRX,也不用燃烧更多TRX,还可节省至少80%的手续费,以租用100万能量为例,若直接燃烧TRX,3天需要燃烧大约840TRX,用feee.io平台租用100万能量只需要140TRX左右,节省了83.33%≈700TRX。推荐使用,具体可参考《如何租用能量？》</p>
        `
  },
  q4: {
    title: '如何租用能量？',
    content: `
        
    <p>feee.io提供了波场能量交易功能,用户可随时自助租用,实时到账。租用流程简单便捷,可选择DAPP租用和转账租用两种方式:</p>
    <p>DAPP租用:</p>
    <p>1.打开租赁网址feee.io,点击登录连接DAPP钱包</p>
    <img src="/src/assets/home/faq4answer1.png" alt="" width="1200">
    <p>2.若未安装DAPP钱包,可点击安装,已经安装可跳过此步</p>
    <img src="/src/assets/home/faq4answer2.png" alt="" width="500" height="500">
    <p>安装好后,可通过浏览器插件进行钱包登录</p>
    <img src="/src/assets/home/faq4answer3.png" alt="" width="500" height="500">
    <p>3.登录钱包后,输入租用能量和租用天数,点击支付即可,转账后,5分钟内能量到账。</p>
    <img src="/src/assets/home/faq4answer4.png" alt="" width="1200">
    <p>转账租用:</p>
    <p>选择转账租用,可在手机端直接转账操作能量租用。</p>
    <p>1.打开租赁网址feee.io,输入想要租用的能量和租用天数,系统自动计算出需要转账的金额</p>
    <img src="/src/assets/home/faq4answer5.png" alt="" width="1200">
    <p>2.复制平台钱包地址,按系统计算出的金额转账到平台钱包地址,平台默认转账钱包为接收能量地址,若需自定义接收地址,请在转账时备注接收地址。转账后,5分钟内能量到账。</p>
    <img src="/src/assets/home/faq4answer6.png" alt="" width="500" height="1000">
        `
  },
  q5: {
    title: '支付成功后，能量什么时候到账？',
    content: `  
    <p>付款完成后，能量会在几分钟到账。由于广播延迟等原因，极少数情况，会存在5到10分钟的延迟。</p>
        `
  },
  q6: {
    title: '能量使用后多久能恢复满？',
    content: `
    <p>能量使用后将会在24小时内恢复满。</p>
        `
  },
  q7: {
    title: '订单可以撤回吗？',
    content: `   
    <p>订单生成后,暂不支持撤回。</p>
        `
  }
}

export default detail

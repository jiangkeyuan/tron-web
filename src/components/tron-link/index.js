import { createApp } from 'vue'
import TronLinkPopup from './tron-link-pc-popup-wrapper.vue'
import { ElMessage } from 'element-plus'
export default function TronLink (options = {}) {
  return new Promise(async(resolve, reject) => {
    const isRead = await window.tronLink?.request({
        method: "tron_requestAccounts",
      });
    const isLoginTron = isRead;
    if (!window.tronLink || isLoginTron == '') {
        if(!window.tronLink) {
            ElMessage.error('请安装 TronLink 钱包')
        }
        if(isLoginTron == '') {
            ElMessage.error('请登录 TronLink 钱包')
        }
      const mountNode = document.createElement('div')
      document.body.appendChild(mountNode)
      const app = createApp(TronLinkPopup, {
        ...options,
        show: true,
        remove () {
          app.unmount(mountNode)
          document.body.removeChild(mountNode)
        }
      })
      reject(false)
      return app.mount(mountNode)
    } else {
      resolve(true)
    }
  })
}
// export default {
//   instance: null,
//   parent: document.createElement('div'),
//   show () {
//     const isShow = true
//     if (this.instance !== null) this.clear()
//     this.instance = createApp(TronLink, {
//         show:isShow,
//     })
//     document.body.appendChild(this.parent)
//     this.instance.mount(this.parent)
//   },
//   hide () {
//     this.clear()
//   },
//   clear () {
//     if (this.instance !== null) {
//       this.instance.unmoun(this.parent)
//       document.body.removeChild(this.parent)
//       this.instance = null
//     }
//   }
// }

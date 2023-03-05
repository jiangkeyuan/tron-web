import { ElLoading, ElMessage,ElConfigProvider } from 'element-plus'
import { Folder,Share,Notebook,WalletFilled,OfficeBuilding,Lock,QuestionFilled } from '@element-plus/icons-vue'
/**
 * 按需导入 Element Plus 组件
 * Vite 插件 https://github.com/antfu/unplugin-vue-components
 * @param app {App}
 */

 export default{
  install: (app, options) => {
    // 在这里编写插件代码
    const components = [ElLoading, ElMessage,ElConfigProvider]
    const icon = [Folder,Share,Notebook,WalletFilled,OfficeBuilding,Lock,QuestionFilled];
    icon.map(v=>{
      app.component(v.name,v);
    })
    components.forEach((v) => {
      app.use(v)
    })
    return app
  }
}
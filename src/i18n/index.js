import { createI18n } from 'vue-i18n'
import { getBrowserLang } from '@/utils/utils/index.js';
import EN from './en.json';
import ZH from './zh.json';
export const i18n = createI18n({
    locale:sessionStorage.getItem('lang') || getBrowserLang() || 'zh-CN',
    fallbackLocale: "en-US", // set locale
    messages:{
        "en-US":EN,
        "zh-CN":ZH
    }
  })

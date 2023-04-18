import { createI18n } from "vue-i18n";
import { getBrowserLang, getStorage } from "@/utils/utils/index.js";
import EN from "./en.json";
import ZH from "./zh.json";
import LGONEN from './login/en.json'
import LGONZH from './login/zh.json'

export const i18n = createI18n({
  legacy: false,
  globalInjection: true,
  locale: getStorage("lang") || getBrowserLang() || "zh-CN",
  fallbackLocale: "en-US", // set locale
  messages: {
    "en-US": {
      ...EN,
      ...LGONEN
    },
    "zh-CN": {
      ...ZH,
      ...LGONZH
    },
  },
});

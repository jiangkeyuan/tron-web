import { createI18n } from "vue-i18n";
import { getBrowserLang, getStorage } from "@/utils/utils/index.js";
import EN from "./en.json";
import ZH from "./zh.json";
import LGONEN from './login/en.json'
import LGONZH from './login/zh.json'
import HOMEEN from './home/en.json'
import HOMEZH from './home/zh.json'
import BUYERZH from './buyer/zh.json'
import BUYEREN from './buyer/en.json'
import MANAGEZH from './manage/zh.json'
import MANAGEEN from './manage/en.json'
import RENTZH from './rent/zh.json'
import RENTEN from './rent/en.json'
import MANUALZH from './manual/zh.json'
import MANUALEN from './manual/en.json'
import STATISTICSEN from './statistics/en.json'
import STATISTICSZH from './statistics/zh.json'
import SYSTEMZH from './system/zh.json'
import SYSTEMEN from './system/en.json'
import USRERZH from './user/zh.json'
import USREREN from './user/en.json'
import HELPZH from './help/zh.json'
import HELPEN from './help/en.json'
import KEYZH from './key/zh.json'
import KEYEN from './key/en.json'
export const i18n = createI18n({
  legacy: false,
  globalInjection: true,
  locale: getStorage("lang") || getBrowserLang() || "zh-CN",
  fallbackLocale: "en-US", // set locale
  messages: {
    "en-US": {
      ...EN,
      ...LGONEN,
      ...HOMEEN,
      ...BUYEREN,
      ...MANAGEEN,
      ...RENTEN,
      ...STATISTICSEN,
      ...SYSTEMEN,
      ...USREREN,
      ...HELPEN,
      ...KEYEN,
      ...MANUALEN,
    },
    "zh-CN": {
      ...ZH,
      ...LGONZH,
      ...HOMEZH,
      ...BUYERZH,
      ...MANAGEZH,
      ...RENTZH,
      ...STATISTICSZH,
      ...SYSTEMZH,
      ...USRERZH,
      ...HELPZH,
      ...KEYZH,
      ...MANUALZH,
    },
  },
});

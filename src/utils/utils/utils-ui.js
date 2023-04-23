import { getApiList, addApiList } from "@/utils/axios/buyer/index.js";
import { i18n } from "../../i18n/index.js";
export const createAPIKEY = (callback) => {
  ElMessageBox.prompt("", i18n.global.t('MANAGE-019'), {
    confirmButtonText: i18n.global.t('MANAGE-018'),
    showCancelButton: false,
    inputErrorMessage: "Invalid Email",
    beforeClose: async (a, b, done) => {
      console.log(b);
      if (a === "confirm") {
        const data = await addApiList({
          keyName: b.inputValue,
        });
        ElMessage.success(data.msg);
        if (data.code === 12000) {
          callback();
          done();
        }
      } else {
        done();
      }
    },
  });
};

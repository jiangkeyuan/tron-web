import { getApiList, addApiList } from "@/utils/axios/buyer/index.js";
export const createAPIKEY = (callback) => {
  ElMessageBox.prompt("", "请输入Key的名称，以便区分统计", {
    confirmButtonText: "创建KEY",
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
          done();
          callback();
        }
      } else {
        done();
      }
    },
  });
};
